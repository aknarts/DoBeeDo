"""Tests for the DobeeDoManager coordinator class."""
from __future__ import annotations

import pytest

homeassistant = pytest.importorskip("homeassistant")  # noqa: F401

from homeassistant.core import HomeAssistant
from homeassistant.helpers.event import async_capture_events

from custom_components.dobeedo.coordinator import DobeeDoManager


@pytest.mark.asyncio
async def test_create_board_and_column_and_task_events(hass: HomeAssistant) -> None:
    """Creating entities via the manager should fire events and maintain ordering."""

    manager = DobeeDoManager(hass)

    # Capture all events to assert later.
    board_events = async_capture_events(hass, "dobeedo_board_created")
    task_events = async_capture_events(hass, "dobeedo_task_created")

    board = await manager.async_create_board("My Board")
    column = await manager.async_create_column(board.id, "Todo")
    task1 = await manager.async_create_task(board.id, column.id, "Task 1")
    task2 = await manager.async_create_task(board.id, column.id, "Task 2")

    assert board.id.startswith("board-")
    assert column.id.startswith("column-")
    assert task1.id.startswith("task-")
    assert task2.sort_index == 1

    # Ensure events were fired.
    assert len(board_events) == 1
    assert board_events[0].data["board"]["id"] == board.id

    assert len(task_events) == 2
    assert task_events[0].data["task"]["id"] == task1.id
    assert task_events[1].data["task"]["id"] == task2.id


@pytest.mark.asyncio
async def test_move_and_delete_task(hass: HomeAssistant) -> None:
    """Tasks can be moved between columns and deleted."""

    manager = DobeeDoManager(hass)

    board = await manager.async_create_board("Board")
    col_todo = await manager.async_create_column(board.id, "Todo")
    col_done = await manager.async_create_column(board.id, "Done")

    task = await manager.async_create_task(board.id, col_todo.id, "Task")

    move_events = async_capture_events(hass, "dobeedo_task_moved")
    delete_events = async_capture_events(hass, "dobeedo_task_deleted")

    await manager.async_move_task(task.id, col_done.id)
    assert task.column_id == col_done.id

    await manager.async_delete_task(task.id)

    assert len(move_events) == 1
    assert move_events[0].data["task"]["id"] == task.id

    assert len(delete_events) == 1
    assert delete_events[0].data["task"]["id"] == task.id

