"""Tests for the DobeeDoManager coordinator class.

These tests use a tiny fake Home Assistant core object so they can run
without the full Home Assistant test harness.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List

import importlib

import pytest

coordinator = importlib.import_module("custom_components.dobeedo.coordinator")
DobeeDoManager = getattr(coordinator, "DobeeDoManager")


@dataclass
class _FakeEvent:
    event_type: str
    data: Dict[str, Any]


class _FakeBus:
    def __init__(self) -> None:
        self.events: List[_FakeEvent] = []

    def async_fire(self, event_type: str, data: Dict[str, Any]) -> None:
        self.events.append(_FakeEvent(event_type=event_type, data=data))


class _FakeHass:
    def __init__(self) -> None:
        self.bus = _FakeBus()


@pytest.mark.asyncio
async def test_create_board_and_column_and_task_events() -> None:
    """Creating entities via the manager should fire events and maintain ordering."""

    hass = _FakeHass()
    manager = DobeeDoManager(hass)  # type: ignore[arg-type]

    board = await manager.async_create_board("My Board")
    column = await manager.async_create_column(board.id, "Todo")
    task1 = await manager.async_create_task(board.id, column.id, "Task 1")
    task2 = await manager.async_create_task(board.id, column.id, "Task 2")

    assert board.id.startswith("board-")
    assert column.id.startswith("column-")
    assert task1.id.startswith("task-")
    assert task2.sort_index == 1

    board_events = [e for e in hass.bus.events if e.event_type == "dobeedo_board_created"]
    task_events = [e for e in hass.bus.events if e.event_type == "dobeedo_task_created"]

    assert len(board_events) == 1
    assert board_events[0].data["board"]["id"] == board.id

    assert len(task_events) == 2
    assert task_events[0].data["task"]["id"] == task1.id
    assert task_events[1].data["task"]["id"] == task2.id


@pytest.mark.asyncio
async def test_move_and_delete_task() -> None:
    """Tasks can be moved between columns and deleted."""

    hass = _FakeHass()
    manager = DobeeDoManager(hass)  # type: ignore[arg-type]

    board = await manager.async_create_board("Board")
    col_todo = await manager.async_create_column(board.id, "Todo")
    col_done = await manager.async_create_column(board.id, "Done")

    task = await manager.async_create_task(board.id, col_todo.id, "Task")

    await manager.async_move_task(task.id, col_done.id)
    assert task.column_id == col_done.id

    await manager.async_delete_task(task.id)

    move_events = [e for e in hass.bus.events if e.event_type == "dobeedo_task_moved"]
    delete_events = [e for e in hass.bus.events if e.event_type == "dobeedo_task_deleted"]

    assert len(move_events) == 1
    assert move_events[0].data["task"]["id"] == task.id

    assert len(delete_events) == 1
    assert delete_events[0].data["task"]["id"] == task.id
