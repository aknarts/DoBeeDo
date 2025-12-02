"""Tests for the DoBeeDo domain model and storage helpers.

These tests exercise only the pure Python model and storage helpers and
can run without a Home Assistant installation.
"""
from __future__ import annotations

import importlib

model = importlib.import_module("custom_components.dobeedo.model")
storage = importlib.import_module("custom_components.dobeedo.storage")

Board = getattr(model, "Board")
Column = getattr(model, "Column")
Task = getattr(model, "Task")
ChecklistItem = getattr(model, "ChecklistItem")
EntityLink = getattr(model, "EntityLink")
serialize_model = getattr(storage, "serialize_model")
deserialize_model = getattr(storage, "deserialize_model")


def test_board_roundtrip() -> None:
    """Board should round-trip through to_dict/from_dict."""

    board = Board(id="b1", name="Board", description="Desc", column_ids=["c1", "c2"])
    as_dict = board.to_dict()
    restored = Board.from_dict(as_dict)

    assert restored == board


def test_column_and_task_roundtrip() -> None:
    """Column and Task should round-trip through to_dict/from_dict."""

    column = Column(id="c1", board_id="b1", name="Todo", order_index=0)
    task = Task(
        id="t1",
        board_id="b1",
        column_id="c1",
        title="Task",
        description="Details",
        sort_index=5,
    )

    assert Column.from_dict(column.to_dict()) == column
    assert Task.from_dict(task.to_dict()) == task


def test_checklist_and_entity_link_roundtrip() -> None:
    """ChecklistItem and EntityLink should round-trip correctly."""

    item = ChecklistItem(id="i1", task_id="t1", label="Do thing", done=True)
    link = EntityLink(id="e1", task_id="t1", entity_id="sensor.test")

    assert ChecklistItem.from_dict(item.to_dict()) == item
    assert EntityLink.from_dict(link.to_dict()) == link


def test_serialize_and_deserialize_model() -> None:
    """serialize_model and deserialize_model are inverses for simple data."""

    boards = [Board(id="b1", name="Board")]  # column_ids defaults to None
    columns = [Column(id="c1", board_id="b1", name="Todo", order_index=0)]
    tasks = [Task(id="t1", board_id="b1", column_id="c1", title="Task")]

    data = serialize_model(boards, columns, tasks)
    restored_boards, restored_columns, restored_tasks = deserialize_model(data)

    assert len(restored_boards) == 1
    restored = restored_boards[0]
    assert restored.id == "b1"
    assert restored.name == "Board"
    # column_ids is normalised from None to [] by Board.to_dict/from_dict
    assert restored.column_ids == []

    assert restored_columns == columns
    assert restored_tasks == tasks
