"""Coordinator / manager for DoBeeDo integration state.

This module defines :class:`DobeeDoManager`, which holds the in-memory
representation of boards, columns, and tasks, and exposes async CRUD
operations. Changes are automatically persisted to storage.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional

from homeassistant.core import HomeAssistant

from .const import (
    EVENT_BOARD_CREATED,
    EVENT_BOARD_DELETED,
    EVENT_BOARD_UPDATED,
    EVENT_TASK_CREATED,
    EVENT_TASK_DELETED,
    EVENT_TASK_MOVED,
    EVENT_TASK_UPDATED,
    EVENT_COLUMN_CREATED,
    EVENT_COLUMN_DELETED,
)
from .model import Board, Column, Task
from .storage import DobeeDoStorage, deserialize_model, serialize_model


@dataclass
class _IdCounters:
    """Simple monotonic ID counters for boards, columns, and tasks.

    This avoids pulling in ``uuid`` for the MVP and keeps IDs readable
    while still unique within a running Home Assistant instance.
    """

    boards: int = 0
    columns: int = 0
    tasks: int = 0


class DobeeDoManager:
    """In-memory state manager for the DoBeeDo integration.

    The manager is responsible for:

    * Tracking all boards, columns, and tasks in memory.
    * Providing async CRUD methods that the services and WebSocket API
      can call.
    * Emitting Home Assistant events when meaningful changes occur.
    * Persisting all changes to storage automatically.
    """

    def __init__(self, hass: HomeAssistant, storage: DobeeDoStorage | None = None) -> None:
        self._hass = hass
        self._storage = storage or DobeeDoStorage(hass)
        self._boards: Dict[str, Board] = {}
        self._columns: Dict[str, Column] = {}
        self._tasks: Dict[str, Task] = {}
        self._ids = _IdCounters()

    # ---------------------------------------------------------------------
    # Storage helpers
    # ---------------------------------------------------------------------

    async def async_clear_all_data(self) -> None:
        """Clear all boards, columns, and tasks.

        DEVELOPMENT ONLY: This is a destructive operation meant for testing.
        """
        self._boards.clear()
        self._columns.clear()
        self._tasks.clear()
        self._ids.boards = 0
        self._ids.columns = 0
        self._ids.tasks = 0
        await self.async_save_to_storage()

    async def async_populate_test_data(self) -> None:
        """Populate the board with sample data for testing.

        DEVELOPMENT ONLY: This clears all existing data and creates a fresh
        sample board with multiple columns and tasks. Useful for quick testing.

        Call via: Developer Tools > Services > dobeedo.populate_test_data
        Or CLI: ha service call dobeedo.populate_test_data
        """
        # Clear existing data first
        await self.async_clear_all_data()

        # Create a test board
        board = await self.async_create_board(
            "Sample Project",
            "A demo board with tasks in various states"
        )

        # Create columns for a typical kanban workflow
        backlog = await self.async_create_column(board.id, "Backlog")
        todo = await self.async_create_column(board.id, "To Do")
        in_progress = await self.async_create_column(board.id, "In Progress")
        review = await self.async_create_column(board.id, "Review")
        done = await self.async_create_column(board.id, "Done")

        # Populate backlog
        await self.async_create_task(
            board.id, backlog.id, "Research user requirements",
            "Gather feedback from users about needed features",
            priority="low",
            tags=["research", "user-feedback"]
        )
        await self.async_create_task(
            board.id, backlog.id, "Design new dashboard",
            "Create mockups for the analytics dashboard",
            tags=["design", "ui"]
        )

        # Populate to-do
        await self.async_create_task(
            board.id, todo.id, "Set up development environment",
            "Install dependencies and configure dev tools",
            priority="medium"
        )
        await self.async_create_task(
            board.id, todo.id, "Write API documentation",
            None
        )

        # Populate in-progress
        await self.async_create_task(
            board.id, in_progress.id, "Implement user authentication",
            "Add login and registration endpoints",
            priority="high"
        )
        await self.async_create_task(
            board.id, in_progress.id, "Create database schema",
            "Design tables for users, tasks, and boards"
        )

        # Populate review
        await self.async_create_task(
            board.id, review.id, "Update integration tests",
            "Ensure all API endpoints have test coverage"
        )

        # Populate done
        await self.async_create_task(
            board.id, done.id, "Initial project setup",
            "Repository created and basic structure in place"
        )
        await self.async_create_task(
            board.id, done.id, "Configure CI/CD pipeline",
            "GitHub Actions configured for automated testing"
        )

    async def async_load_from_storage(self) -> None:
        """Load persisted data from storage into memory."""
        data = await self._storage.async_load()
        if data is None:
            return

        boards, columns, tasks, id_counters = deserialize_model(data)

        # Restore ID counters
        self._ids.boards = id_counters.get("boards", 0)
        self._ids.columns = id_counters.get("columns", 0)
        self._ids.tasks = id_counters.get("tasks", 0)

        # Restore boards, columns, and tasks into dictionaries
        self._boards = {board.id: board for board in boards}
        self._columns = {column.id: column for column in columns}
        self._tasks = {task.id: task for task in tasks}

    async def async_save_to_storage(self) -> None:
        """Persist current in-memory state to storage."""
        boards = list(self._boards.values())
        columns = list(self._columns.values())
        tasks = list(self._tasks.values())
        id_counters = {
            "boards": self._ids.boards,
            "columns": self._ids.columns,
            "tasks": self._ids.tasks,
        }

        data = serialize_model(boards, columns, tasks, id_counters)
        await self._storage.async_save(data)

    # ---------------------------------------------------------------------
    # Board helpers
    # ---------------------------------------------------------------------

    async def async_get_boards(self) -> List[Board]:
        """Return all boards in creation order.

        For now we simply return in dictionary insertion order, which is
        stable in modern Python.
        """

        return list(self._boards.values())

    async def async_get_board(self, board_id: str) -> Optional[Board]:
        """Return a single board by ID, if it exists."""

        return self._boards.get(board_id)

    async def async_create_board(
        self, name: str, description: str | None = None
    ) -> Board:
        """Create and return a new board."""

        board_id = self._next_board_id()
        board = Board(id=board_id, name=name, description=description, column_ids=[])
        self._boards[board_id] = board

        self._fire_event(EVENT_BOARD_CREATED, {"board": board.to_dict()})
        await self.async_save_to_storage()
        return board

    async def async_update_board(self, board_id: str, **updates: Any) -> Board:
        """Update an existing board.

        Raises ``KeyError`` if the board does not exist. Higher layers
        (services/WebSocket) should translate this into a user-friendly
        error.
        """

        board = self._boards[board_id]

        if "name" in updates and updates["name"] is not None:
            board.name = str(updates["name"])
        if "description" in updates:
            board.description = updates["description"]

        self._fire_event(EVENT_BOARD_UPDATED, {"board": board.to_dict()})
        await self.async_save_to_storage()
        return board

    async def async_delete_board(self, board_id: str) -> None:
        """Delete a board and all of its columns and tasks."""

        board = self._boards.pop(board_id)

        # Remove columns and tasks associated with this board.
        column_ids = [cid for cid, col in self._columns.items() if col.board_id == board_id]
        for cid in column_ids:
            self._columns.pop(cid, None)

        task_ids = [tid for tid, task in self._tasks.items() if task.board_id == board_id]
        for tid in task_ids:
            self._tasks.pop(tid, None)

        self._fire_event(EVENT_BOARD_DELETED, {"board": board.to_dict()})
        await self.async_save_to_storage()

    # ---------------------------------------------------------------------
    # Column helpers
    # ---------------------------------------------------------------------

    async def async_get_columns_for_board(self, board_id: str) -> List[Column]:
        """Return all columns for a board in order_index order."""

        board = self._boards.get(board_id)
        if board is None or not board.column_ids:
            return []
        return [self._columns[cid] for cid in board.column_ids if cid in self._columns]

    async def async_create_column(
        self, board_id: str, name: str, order_index: int | None = None
    ) -> Column:
        """Create a new column on a board.

        The column is appended at the end of the board's columns unless
        ``order_index`` is provided.
        """

        if board_id not in self._boards:
            raise KeyError(board_id)

        column_id = self._next_column_id()
        board = self._boards[board_id]

        if board.column_ids is None:
            board.column_ids = []

        if order_index is None or order_index >= len(board.column_ids):
            order_index = len(board.column_ids)

        # Insert the column ID into the board's ordering list.
        board.column_ids.insert(order_index, column_id)

        column = Column(
            id=column_id,
            board_id=board_id,
            name=name,
            order_index=order_index,
        )
        self._columns[column_id] = column

        # Re-normalise order_index for all columns on the board so they
        # are contiguous after the insert.
        await self._reindex_columns(board_id)

        # Fire a column-created event so frontends can react.
        self._fire_event(EVENT_COLUMN_CREATED, {"column": column.to_dict()})
        await self.async_save_to_storage()

        return column

    async def async_delete_column(self, column_id: str) -> None:
        """Delete a column and all tasks within it."""

        column = self._columns.pop(column_id)
        board = self._boards.get(column.board_id)

        # Remove from board's column_ids list
        if board and board.column_ids and column_id in board.column_ids:
            board.column_ids.remove(column_id)
            await self._reindex_columns(column.board_id)

        # Remove all tasks in this column
        task_ids = [tid for tid, task in self._tasks.items() if task.column_id == column_id]
        for tid in task_ids:
            self._tasks.pop(tid, None)

        self._fire_event(EVENT_COLUMN_DELETED, {"column": column.to_dict()})
        await self.async_save_to_storage()

    async def _reindex_columns(self, board_id: str) -> None:
        """Ensure column ``order_index`` values are contiguous for a board."""

        board = self._boards[board_id]
        if not board.column_ids:
            return

        for idx, column_id in enumerate(board.column_ids):
            column = self._columns.get(column_id)
            if column is not None:
                column.order_index = idx

    # ---------------------------------------------------------------------
    # Task helpers
    # ---------------------------------------------------------------------

    async def async_get_tasks_for_board(self, board_id: str) -> List[Task]:
        """Return all tasks for a board, unsorted."""

        return [task for task in self._tasks.values() if task.board_id == board_id]

    async def async_create_task(
        self,
        board_id: str,
        column_id: str,
        title: str,
        description: str | None = None,
        sort_index: int | None = None,
        due_date: str | None = None,
        priority: str | None = None,
        tags: list[str] | None = None,
    ) -> Task:
        """Create a new task in a column."""

        if board_id not in self._boards:
            raise KeyError(board_id)
        if column_id not in self._columns:
            raise KeyError(column_id)

        task_id = self._next_task_id()

        # Determine the sort index relative to other tasks in the column.
        existing = [
            t
            for t in self._tasks.values()
            if t.column_id == column_id and t.board_id == board_id
        ]
        if sort_index is None or sort_index >= len(existing):
            sort_index = len(existing)

        task = Task(
            id=task_id,
            board_id=board_id,
            column_id=column_id,
            title=title,
            description=description,
            sort_index=sort_index,
            due_date=due_date,
            priority=priority,
            tags=tags,
        )
        self._tasks[task_id] = task

        await self._reindex_tasks(column_id)

        self._fire_event(EVENT_TASK_CREATED, {"task": task.to_dict()})
        await self.async_save_to_storage()
        return task

    async def async_update_task(self, task_id: str, **updates: Any) -> Task:
        """Update an existing task.

        Raises ``KeyError`` if the task does not exist.
        """

        task = self._tasks[task_id]

        if "title" in updates and updates["title"] is not None:
            task.title = str(updates["title"])
        if "description" in updates:
            task.description = updates["description"]
        if "due_date" in updates:
            task.due_date = updates["due_date"]
        if "priority" in updates:
            task.priority = updates["priority"]
        if "tags" in updates:
            task.tags = updates["tags"]

        self._fire_event(EVENT_TASK_UPDATED, {"task": task.to_dict()})
        await self.async_save_to_storage()
        return task

    async def async_move_task(
        self,
        task_id: str,
        target_column_id: str,
        target_sort_index: int | None = None,
    ) -> Task:
        """Move a task to another column (or reorder within the same one)."""

        task = self._tasks[task_id]

        if target_column_id not in self._columns:
            raise KeyError(target_column_id)

        old_column_id = task.column_id
        task.column_id = target_column_id

        # Compute target index within the destination column.
        column_tasks = [
            t
            for t in self._tasks.values()
            if t.column_id == target_column_id and t.board_id == task.board_id
        ]

        if target_sort_index is None or target_sort_index >= len(column_tasks):
            target_sort_index = len(column_tasks)

        task.sort_index = target_sort_index

        # Reindex target column
        await self._reindex_tasks(target_column_id)

        # If moved between columns, also reindex the source column
        if old_column_id != target_column_id:
            await self._reindex_tasks(old_column_id)

        self._fire_event(EVENT_TASK_MOVED, {"task": task.to_dict()})
        await self.async_save_to_storage()
        return task

    async def async_delete_task(self, task_id: str) -> None:
        """Delete a task."""

        task = self._tasks.pop(task_id)
        await self._reindex_tasks(task.column_id)

        self._fire_event(EVENT_TASK_DELETED, {"task": task.to_dict()})
        await self.async_save_to_storage()

    async def _reindex_tasks(self, column_id: str) -> None:
        """Normalise ``sort_index`` for tasks in a column."""

        column_tasks = [t for t in self._tasks.values() if t.column_id == column_id]
        column_tasks.sort(key=lambda t: t.sort_index)

        for idx, task in enumerate(column_tasks):
            task.sort_index = idx

    # ---------------------------------------------------------------------
    # Internal helpers
    # ---------------------------------------------------------------------

    def _next_board_id(self) -> str:
        self._ids.boards += 1
        return f"board-{self._ids.boards}"

    def _next_column_id(self) -> str:
        self._ids.columns += 1
        return f"column-{self._ids.columns}"

    def _next_task_id(self) -> str:
        self._ids.tasks += 1
        return f"task-{self._ids.tasks}"

    def _fire_event(self, event_type: str, data: Dict[str, Any]) -> None:
        """Fire an event on the Home Assistant bus."""

        self._hass.bus.async_fire(event_type, data)
