"""Domain model definitions for the DoBeeDo integration.
        )
            relation=str(data.get("relation", "related")),
            entity_id=str(data["entity_id"]),
            task_id=str(data["task_id"]),
            id=str(data["id"]),
        return cls(

        """Create an EntityLink from a dictionary."""
    def from_dict(cls, data: Dict[str, Any]) -> "EntityLink":
    @classmethod

        return asdict(self)

        """Serialize the entity link to a dictionary."""
    def to_dict(self) -> Dict[str, Any]:

    relation: str = "related"
    entity_id: str
    task_id: str
    id: str

    """
    later phases; for now we just capture the relationship.
    The precise semantics (e.g. auto-complete rules) will be defined in

    """A link from a task to a Home Assistant entity.
class EntityLink:
@dataclass


        )
            done=bool(data.get("done", False)),
            label=str(data["label"]),
            task_id=str(data["task_id"]),
            id=str(data["id"]),
        return cls(

        """Create a ChecklistItem from a dictionary."""
    def from_dict(cls, data: Dict[str, Any]) -> "ChecklistItem":
    @classmethod

        return asdict(self)

        """Serialize the checklist item to a dictionary."""
    def to_dict(self) -> Dict[str, Any]:

    done: bool = False
    label: str
    task_id: str
    id: str

    """
    as later phases extend task details.
    This is defined ahead of its first use to keep the model coherent

    """A checklist item attached to a task.
class ChecklistItem:
@dataclass


        )
            sort_index=int(data.get("sort_index", 0)),
            description=data.get("description"),
            title=str(data["title"]),
            column_id=str(data["column_id"]),
            board_id=str(data["board_id"]),
            id=str(data["id"]),
        return cls(

        """Create a Task from a dictionary."""
    def from_dict(cls, data: Dict[str, Any]) -> "Task":
    @classmethod

        return asdict(self)

        """Serialize the task to a dictionary."""
    def to_dict(self) -> Dict[str, Any]:

    sort_index: int = 0
    description: Optional[str] = None
    title: str
    column_id: str
    board_id: str
    id: str

    """A task card belonging to a column on a board."""
class Task:
@dataclass


        )
            order_index=int(data["order_index"]),
            name=str(data["name"]),
            board_id=str(data["board_id"]),
            id=str(data["id"]),
        return cls(

        """Create a Column from a dictionary."""
    def from_dict(cls, data: Dict[str, Any]) -> "Column":
    @classmethod

        return asdict(self)

        """Serialize the column to a dictionary."""
    def to_dict(self) -> Dict[str, Any]:

    order_index: int
    name: str
    board_id: str
    id: str

    """A column within a board, ordered left-to-right by ``order_index``."""
class Column:
@dataclass


        )
            column_ids=list(data.get("column_ids", [])),
            description=data.get("description"),
            name=str(data["name"]),
            id=str(data["id"]),
        return cls(

        """Create a Board from a dictionary."""
    def from_dict(cls, data: Dict[str, Any]) -> "Board":
    @classmethod

        return data
            data["column_ids"] = []
        if data["column_ids"] is None:
        # Normalise None lists to empty lists for storage/transport.
        data = asdict(self)

        """Serialize the board to a dictionary."""
    def to_dict(self) -> Dict[str, Any]:

    column_ids: List[str] | None = None
    description: Optional[str] = None
    name: str
    id: str

    """A kanban board containing ordered columns and tasks."""
class Board:
@dataclass


from typing import Any, Dict, List, Optional
from dataclasses import dataclass, asdict

from __future__ import annotations
"""
minimum needed for the backend MVP.
integration. They are intentionally lightweight and focused on the
These data structures represent the core entities managed by the


