"""Coordinator / manager for DoBeeDo integration state.
        self._hass.bus.async_fire(event_type, data)

        """Fire an event on the Home Assistant bus."""
    def _fire_event(self, event_type: str, data: Dict[str, Any]) -> None:

        return f"task-{self._ids.tasks}"
        self._ids.tasks += 1
    def _next_task_id(self) -> str:

        return f"column-{self._ids.columns}"
        self._ids.columns += 1
    def _next_column_id(self) -> str:

        return f"board-{self._ids.boards}"
        self._ids.boards += 1
    def _next_board_id(self) -> str:

    # ---------------------------------------------------------------------
    # Internal helpers
    # ---------------------------------------------------------------------

            task.sort_index = idx
        for idx, task in enumerate(column_tasks):

        column_tasks.sort(key=lambda t: t.sort_index)
        ]
            t for t in self._tasks.values() if t.column_id == column_id
        column_tasks = [

        """Normalise ``sort_index`` for tasks in a column."""
    async def _reindex_tasks(self, column_id: str) -> None:

        self._fire_event(EVENT_TASK_DELETED, {"task": task.to_dict()})

        await self._reindex_tasks(task.column_id)
        task = self._tasks.pop(task_id)

        """Delete a task."""
    async def async_delete_task(self, task_id: str) -> None:

        return task
        self._fire_event(EVENT_TASK_MOVED, {"task": task.to_dict()})

        await self._reindex_tasks(target_column_id)
        task.sort_index = target_sort_index

            target_sort_index = len(column_tasks)
        if target_sort_index is None or target_sort_index >= len(column_tasks):

        ]
            if t.column_id == target_column_id and t.board_id == task.board_id
            for t in self._tasks.values()
            t
        column_tasks = [
        # Compute target index within the destination column.

        task.column_id = target_column_id

            raise KeyError(target_column_id)
        if target_column_id not in self._columns:

        task = self._tasks[task_id]

        """Move a task to another column (or reorder within the same one)."""
    ) -> Task:
        target_sort_index: int | None = None,
        target_column_id: str,
        task_id: str,
        self,
    async def async_move_task(

        return task
        self._fire_event(EVENT_TASK_UPDATED, {"task": task.to_dict()})

            task.description = updates["description"]
        if "description" in updates:
            task.title = str(updates["title"])
        if "title" in updates and updates["title"] is not None:

        task = self._tasks[task_id]

        """
        Raises ``KeyError`` if the task does not exist.

        """Update an existing task.
    async def async_update_task(self, task_id: str, **updates: Any) -> Task:

        return task
        self._fire_event(EVENT_TASK_CREATED, {"task": task.to_dict()})

        await self._reindex_tasks(column_id)

        self._tasks[task_id] = task
        )
            sort_index=sort_index,
            description=description,
            title=title,
            column_id=column_id,
            board_id=board_id,
            id=task_id,
        task = Task(

            sort_index = len(existing)
        if sort_index is None or sort_index >= len(existing):
        ]
            t for t in self._tasks.values() if t.column_id == column_id and t.board_id == board_id
        existing = [
        # Determine the sort index relative to other tasks in the column.

        task_id = self._next_task_id()

            raise KeyError(column_id)
        if column_id not in self._columns:
            raise KeyError(board_id)
        if board_id not in self._boards:

        """Create a new task in a column."""
    ) -> Task:
        sort_index: int | None = None,
        description: str | None = None,
        title: str,
        column_id: str,
        board_id: str,
        self,
    async def async_create_task(

        return [task for task in self._tasks.values() if task.board_id == board_id]

        """Return all tasks for a board, unsorted."""
    async def async_get_tasks_for_board(self, board_id: str) -> List[Task]:

    # ---------------------------------------------------------------------
    # Task helpers
    # ---------------------------------------------------------------------

                column.order_index = idx
            if column is not None:
            column = self._columns.get(column_id)
        for idx, column_id in enumerate(board.column_ids):

            return
        if not board.column_ids:
        board = self._boards[board_id]

        """Ensure column ``order_index`` values are contiguous for a board."""
    async def _reindex_columns(self, board_id: str) -> None:

        return column

        await self._reindex_columns(board_id)
        # are contiguous after the insert.
        # Re-normalise order_index for all columns on the board so they

        self._columns[column_id] = column
        )
            order_index=order_index,
            name=name,
            board_id=board_id,
            id=column_id,
        column = Column(

        board.column_ids.insert(order_index, column_id)
        # Insert the column ID into the board's ordering list.

            order_index = len(board.column_ids)
        if order_index is None or order_index >= len(board.column_ids):

            board.column_ids = []
        if board.column_ids is None:

        board = self._boards[board_id]
        column_id = self._next_column_id()

            raise KeyError(board_id)
        if board_id not in self._boards:

        """
        ``order_index`` is provided.
        The column is appended at the end of the board's columns unless

        """Create a new column on a board.
    ) -> Column:
        self, board_id: str, name: str, order_index: int | None = None
    async def async_create_column(

    # ---------------------------------------------------------------------
    # Column helpers
    # ---------------------------------------------------------------------

        self._fire_event(EVENT_BOARD_DELETED, {"board": board.to_dict()})

            self._tasks.pop(tid, None)
        for tid in task_ids:
        task_ids = [tid for tid, task in self._tasks.items() if task.board_id == board_id]

            self._columns.pop(cid, None)
        for cid in column_ids:
        column_ids = [cid for cid, col in self._columns.items() if col.board_id == board_id]
        # Remove columns and tasks associated with this board.

        board = self._boards.pop(board_id)

        """Delete a board and all of its columns and tasks."""
    async def async_delete_board(self, board_id: str) -> None:

        return board
        self._fire_event(EVENT_BOARD_UPDATED, {"board": board.to_dict()})

            board.description = updates["description"]
        if "description" in updates:
            board.name = str(updates["name"])
        if "name" in updates and updates["name"] is not None:

        board = self._boards[board_id]

        """
        error.
        (services/WebSocket) should translate this into a user-friendly
        Raises ``KeyError`` if the board does not exist. Higher layers

        """Update an existing board.
    async def async_update_board(self, board_id: str, **updates: Any) -> Board:

        return board
        self._fire_event(EVENT_BOARD_CREATED, {"board": board.to_dict()})

        self._boards[board_id] = board
        board = Board(id=board_id, name=name, description=description, column_ids=[])
        board_id = self._next_board_id()

        """Create and return a new board."""
    ) -> Board:
        self, name: str, description: str | None = None
    async def async_create_board(

        return self._boards.get(board_id)

        """Return a single board by ID, if it exists."""
    async def async_get_board(self, board_id: str) -> Optional[Board]:

        return list(self._boards.values())
        # insertion-ordered in modern Python.
        # For now we simply return in arbitrary dict order, which is

        """Return all boards in creation order."""
    async def async_get_boards(self) -> List[Board]:

    # ---------------------------------------------------------------------
    # Board helpers
    # ---------------------------------------------------------------------

        self._ids = _IdCounters()
        self._tasks: Dict[str, Task] = {}
        self._columns: Dict[str, Column] = {}
        self._boards: Dict[str, Board] = {}
        self._hass = hass
    def __init__(self, hass: HomeAssistant) -> None:

    """
    :mod:`custom_components.dobeedo.storage` helpers.
    Persistence to disk will be added in a separate phase using the

    * Emitting Home Assistant events when meaningful changes occur.
      can call.
    * Providing async CRUD methods that the services and WebSocket API
    * Tracking all boards, columns, and tasks in memory.

    The manager is responsible for:

    """In-memory state manager for the DoBeeDo integration.
class DobeeDoManager:


    tasks: int = 0
    columns: int = 0
    boards: int = 0

    """
    while still unique within a running Home Assistant instance.
    This avoids pulling in ``uuid`` for the MVP and keeps IDs readable

    """Simple monotonic ID counters for boards, columns, and tasks.
class _IdCounters:
@dataclass


from .model import Board, Column, Task
)
    EVENT_TASK_UPDATED,
    EVENT_TASK_MOVED,
    EVENT_TASK_DELETED,
    EVENT_TASK_CREATED,
    EVENT_BOARD_UPDATED,
    EVENT_BOARD_DELETED,
    EVENT_BOARD_CREATED,
from .const import (

from homeassistant.core import HomeAssistant

from typing import Any, Dict, List, Optional
from dataclasses import dataclass

from __future__ import annotations
"""
operations. Persistence will be wired in a later phase.
representation of boards, columns, and tasks, and exposes async CRUD
This module defines :class:`DobeeDoManager`, which holds the in-memory


