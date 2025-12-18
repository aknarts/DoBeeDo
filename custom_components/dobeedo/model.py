"""Domain model definitions for the DoBeeDo integration.

These data structures represent the core entities managed by the
integration. They are intentionally lightweight and focused on the
minimum needed for the backend MVP.
"""
from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Any, Dict, List, Optional


@dataclass
class Board:
    """A kanban board containing ordered columns and tasks."""

    id: str
    name: str
    description: Optional[str] = None
    column_ids: List[str] | None = None

    def to_dict(self) -> Dict[str, Any]:
        """Serialize the board to a dictionary."""

        data = asdict(self)
        # Normalise None lists to empty lists for storage/transport.
        if data["column_ids"] is None:
            data["column_ids"] = []
        return data

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Board":
        """Create a Board from a dictionary."""

        return cls(
            id=str(data["id"]),
            name=str(data["name"]),
            description=data.get("description"),
            column_ids=list(data.get("column_ids", [])),
        )


@dataclass
class Column:
    """A column within a board, ordered left-to-right by ``order_index``."""

    id: str
    board_id: str
    name: str
    order_index: int

    def to_dict(self) -> Dict[str, Any]:
        """Serialize the column to a dictionary."""

        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Column":
        """Create a Column from a dictionary."""

        return cls(
            id=str(data["id"]),
            board_id=str(data["board_id"]),
            name=str(data["name"]),
            order_index=int(data["order_index"]),
        )


@dataclass
class Task:
    """A task card belonging to a column on a board."""

    id: str
    board_id: str
    column_id: str
    title: str
    description: Optional[str] = None
    sort_index: int = 0
    due_date: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        """Serialize the task to a dictionary."""

        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Task":
        """Create a Task from a dictionary."""

        return cls(
            id=str(data["id"]),
            board_id=str(data["board_id"]),
            column_id=str(data["column_id"]),
            title=str(data["title"]),
            description=data.get("description"),
            sort_index=int(data.get("sort_index", 0)),
            due_date=data.get("due_date"),
        )


@dataclass
class ChecklistItem:
    """A checklist item attached to a task.

    This is defined ahead of its first use to keep the model coherent
    as later phases extend task details.
    """

    id: str
    task_id: str
    label: str
    done: bool = False

    def to_dict(self) -> Dict[str, Any]:
        """Serialize the checklist item to a dictionary."""

        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "ChecklistItem":
        """Create a ChecklistItem from a dictionary."""

        return cls(
            id=str(data["id"]),
            task_id=str(data["task_id"]),
            label=str(data["label"]),
            done=bool(data.get("done", False)),
        )


@dataclass
class EntityLink:
    """A link from a task to a Home Assistant entity.

    The precise semantics (e.g. auto-complete rules) will be defined in
    later phases; for now we just capture the relationship.
    """

    id: str
    task_id: str
    entity_id: str
    relation: str = "related"

    def to_dict(self) -> Dict[str, Any]:
        """Serialize the entity link to a dictionary."""

        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "EntityLink":
        """Create an EntityLink from a dictionary."""

        return cls(
            id=str(data["id"]),
            task_id=str(data["task_id"]),
            entity_id=str(data["entity_id"]),
            relation=str(data.get("relation", "related")),
        )
