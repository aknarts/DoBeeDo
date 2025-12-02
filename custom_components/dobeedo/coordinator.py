"""Coordinator / manager for DoBeeDo integration state.

This module defines :class:`DobeeDoManager`, which holds the in-memory
representation of boards, columns, and tasks, and exposes async CRUD
operations. Persistence will be wired in a later phase using the
:mod:`custom_components.dobeedo.storage` helpers.
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
)
from .model import Board, Column, Task


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
    """

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self._boards: Dict[str, Board] = {}
        self._columns: Dict[str, Column] = {}
        self._tasks: Dict[str, Task] = {}
        self._ids = _IdCounters()

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

    # ---------------------------------------------------------------------
    # Column helpers
    # ---------------------------------------------------------------------

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

        return column

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
        )
        self._tasks[task_id] = task

        await self._reindex_tasks(column_id)

        self._fire_event(EVENT_TASK_CREATED, {"task": task.to_dict()})
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

        self._fire_event(EVENT_TASK_UPDATED, {"task": task.to_dict()})
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
        await self._reindex_tasks(target_column_id)

        self._fire_event(EVENT_TASK_MOVED, {"task": task.to_dict()})
        return task

    async def async_delete_task(self, task_id: str) -> None:
        """Delete a task."""

        task = self._tasks.pop(task_id)
        await self._reindex_tasks(task.column_id)

        self._fire_event(EVENT_TASK_DELETED, {"task": task.to_dict()})

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
