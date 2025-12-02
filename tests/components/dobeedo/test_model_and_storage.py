"""Tests for the DoBeeDo domain model and storage helpers.

These tests intentionally avoid importing Home Assistant directly, but
``custom_components.dobeedo`` itself depends on Home Assistant. To keep
`pytest` runs working in a plain environment, the tests are skipped if
Home Assistant is not installed.
"""
from __future__ import annotations

import pytest

homeassistant = pytest.importorskip("homeassistant")  # type: ignore[assignment]

from custom_components.dobeedo.model import Board, Column, Task, ChecklistItem, EntityLink
from custom_components.dobeedo.storage import (
    deserialize_model,
    serialize_model,
)


async def test_board_roundtrip() -> None:
    """Board should round-trip through to_dict/from_dict."""

    board = Board(id="b1", name="Board", description="Desc", column_ids=["c1", "c2"])
    as_dict = board.to_dict()
    restored = Board.from_dict(as_dict)

    assert restored == board


async def test_column_and_task_roundtrip() -> None:
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


async def test_checklist_and_entity_link_roundtrip() -> None:
    """ChecklistItem and EntityLink should round-trip correctly."""

    item = ChecklistItem(id="i1", task_id="t1", label="Do thing", done=True)
    link = EntityLink(id="e1", task_id="t1", entity_id="sensor.test")

    assert ChecklistItem.from_dict(item.to_dict()) == item
    assert EntityLink.from_dict(link.to_dict()) == link


async def test_serialize_and_deserialize_model() -> None:
    """serialize_model and deserialize_model are inverses for simple data."""

    boards = [Board(id="b1", name="Board")]
    columns = [Column(id="c1", board_id="b1", name="Todo", order_index=0)]
    tasks = [Task(id="t1", board_id="b1", column_id="c1", title="Task")]

    data = serialize_model(boards, columns, tasks)
    restored_boards, restored_columns, restored_tasks = deserialize_model(data)

    assert restored_boards == boards
    assert restored_columns == columns
    assert restored_tasks == tasks
