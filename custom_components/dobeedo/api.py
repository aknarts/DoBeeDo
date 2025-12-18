"""WebSocket API for the DoBeeDo integration.

This module defines a small set of WebSocket commands that the frontend can
use to interact with the DoBeeDo backend.
"""
from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.components import websocket_api
from voluptuous import Any as VAny
from voluptuous import Coerce
from voluptuous import Optional

from .const import (
    DOMAIN,
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
from .coordinator import DobeeDoManager


def _get_manager(hass: HomeAssistant) -> DobeeDoManager | None:
    """Return the DobeeDoManager instance, if one is registered.

    The current integration only supports a single config entry, so we
    return the first stored manager for the domain.
    """

    domain_data = hass.data.get(DOMAIN) or {}
    for entry_data in domain_data.values():
        manager = entry_data.get("manager")
        if isinstance(manager, DobeeDoManager):
            return manager
    return None


@websocket_api.websocket_command({"type": f"{DOMAIN}/get_boards"})
@websocket_api.async_response
async def websocket_get_boards(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return a list of boards from the DobeeDo manager.

    The payload shape is ``{"boards": [...]}``, where each board is a
    plain dictionary representation of the underlying :class:`Board`
    model.
    """

    manager = _get_manager(hass)
    if manager is None:
        # If, for some reason, the manager has not been initialised,
        # return an empty list instead of failing the WebSocket call.
        connection.send_result(msg["id"], {"boards": []})
        return

    boards = [board.to_dict() for board in await manager.async_get_boards()]

    connection.send_result(msg["id"], {"boards": boards})


@websocket_api.websocket_command(
    {
        "type": f"{DOMAIN}/create_board",
        "name": str,
        Optional("description"): VAny(str, None),
    }
)
@websocket_api.async_response
async def websocket_create_board(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Create a new board.

    Required fields: ``name``.
    Optional fields: ``description``.
    """

    manager = _get_manager(hass)
    if manager is None:
        connection.send_error(msg["id"], "not_initialized", "DoBeeDo manager not available")
        return

    try:
        board = await manager.async_create_board(
            msg["name"],
            description=msg.get("description"),
        )
    except Exception as err:
        connection.send_error(msg["id"], "create_failed", str(err))
        return

    connection.send_result(msg["id"], {"board": board.to_dict()})


@websocket_api.websocket_command(
    {"type": f"{DOMAIN}/get_tasks", "board_id": str},
)
@websocket_api.async_response
async def websocket_get_tasks(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return all tasks for a given board.

    Request payload::

        {"type": "dobeedo/get_tasks", "board_id": "board-1"}

    Response payload::

        {"tasks": [...]}  # list of serialized Task dicts
    """

    manager = _get_manager(hass)
    if manager is None:
        connection.send_result(msg["id"], {"tasks": []})
        return

    board_id = msg["board_id"]
    tasks = [task.to_dict() for task in await manager.async_get_tasks_for_board(board_id)]
    connection.send_result(msg["id"], {"tasks": tasks})


@websocket_api.websocket_command(
    {"type": f"{DOMAIN}/get_columns", "board_id": str},
)
@websocket_api.async_response
async def websocket_get_columns(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return all columns for a given board.

    Request payload::

        {"type": "dobeedo/get_columns", "board_id": "board-1"}

    Response payload::

        {"columns": [...]}  # list of serialized Column dicts in order_index order
    """

    manager = _get_manager(hass)
    if manager is None:
        connection.send_result(msg["id"], {"columns": []})
        return

    board_id = msg["board_id"]
    columns = [col.to_dict() for col in await manager.async_get_columns_for_board(board_id)]
    connection.send_result(msg["id"], {"columns": columns})


@websocket_api.websocket_command(
    {
        "type": f"{DOMAIN}/create_task",
        "board_id": str,
        "column_id": str,
        "title": str,
        Optional("description"): VAny(str, None),
        Optional("sort_index"): Coerce(int),
        Optional("due_date"): VAny(str, None),
        Optional("priority"): VAny(str, None),
        Optional("tags"): list,
        # Optional fields may be omitted.
    }
)
@websocket_api.async_response
async def websocket_create_task(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Create a new task on a board.

    Required fields: ``board_id``, ``column_id``, ``title``.
    Optional fields: ``description``, ``sort_index``, ``due_date``, ``priority``, ``tags``.
    """

    manager = _get_manager(hass)
    if manager is None:
        connection.send_error(msg["id"], "not_initialized", "DoBeeDo manager not available")
        return

    try:
        task = await manager.async_create_task(
            msg["board_id"],
            msg["column_id"],
            msg["title"],
            description=msg.get("description"),
            sort_index=msg.get("sort_index"),
            due_date=msg.get("due_date"),
            priority=msg.get("priority"),
            tags=msg.get("tags"),
        )
    except KeyError as err:
        connection.send_error(msg["id"], "not_found", f"Unknown id: {err}")
        return

    connection.send_result(msg["id"], {"task": task.to_dict()})


@websocket_api.websocket_command(
    {
        "type": f"{DOMAIN}/update_task",
        "task_id": str,
        Optional("title"): str,
        Optional("description"): VAny(str, None),
        Optional("due_date"): VAny(str, None),
        Optional("priority"): VAny(str, None),
        Optional("tags"): VAny(list, None),
    }
)
@websocket_api.async_response
async def websocket_update_task(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Update an existing task.

    Required fields: ``task_id``.
    Optional fields: ``title``, ``description``, ``due_date``, ``priority``, ``tags``.
    """

    manager = _get_manager(hass)
    if manager is None:
        connection.send_error(msg["id"], "not_initialized", "DoBeeDo manager not available")
        return

    updates: dict[str, Any] = {}
    if "title" in msg:
        updates["title"] = msg["title"]
    if "description" in msg:
        updates["description"] = msg["description"]
    if "due_date" in msg:
        updates["due_date"] = msg["due_date"]
    if "priority" in msg:
        updates["priority"] = msg["priority"]
    if "tags" in msg:
        updates["tags"] = msg["tags"]

    try:
        task = await manager.async_update_task(msg["task_id"], **updates)
    except KeyError as err:
        connection.send_error(msg["id"], "not_found", f"Unknown id: {err}")
        return

    connection.send_result(msg["id"], {"task": task.to_dict()})


@websocket_api.websocket_command(
    {
        "type": f"{DOMAIN}/move_task",
        "task_id": str,
        "target_column_id": str,
        Optional("target_sort_index"): Coerce(int),
    }
)
@websocket_api.async_response
async def websocket_move_task(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Move a task to another column or reorder within the same column.

    Required fields: ``task_id``, ``target_column_id``.
    Optional field: ``target_sort_index``.
    """

    manager = _get_manager(hass)
    if manager is None:
        connection.send_error(msg["id"], "not_initialized", "DoBeeDo manager not available")
        return

    try:
        task = await manager.async_move_task(
            msg["task_id"],
            msg["target_column_id"],
            target_sort_index=msg.get("target_sort_index"),
        )
    except KeyError as err:
        connection.send_error(msg["id"], "not_found", f"Unknown id: {err}")
        return

    connection.send_result(msg["id"], {"task": task.to_dict()})


@websocket_api.websocket_command(
    {
        "type": f"{DOMAIN}/delete_task",
        "task_id": str,
    }
)
@websocket_api.async_response
async def websocket_delete_task(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Delete an existing task.

    Required fields: ``task_id``.
    """

    manager = _get_manager(hass)
    if manager is None:
        connection.send_error(msg["id"], "not_initialized", "DoBeeDo manager not available")
        return

    try:
        await manager.async_delete_task(msg["task_id"])
    except KeyError as err:
        connection.send_error(msg["id"], "not_found", f"Unknown id: {err}")
        return

    connection.send_result(msg["id"], {"success": True})


@websocket_api.websocket_command(
    {
        "type": f"{DOMAIN}/create_column",
        "board_id": str,
        "name": str,
        # Optional order_index may be omitted.
    }
)
@websocket_api.async_response
async def websocket_create_column(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Create a new column on a board.

    Required fields: ``board_id``, ``name``.
    Optional field: ``order_index``.
    """

    manager = _get_manager(hass)
    if manager is None:
        connection.send_error(msg["id"], "not_initialized", "DoBeeDo manager not available")
        return

    try:
        column = await manager.async_create_column(
            msg["board_id"],
            msg["name"],
            order_index=msg.get("order_index"),
        )
    except KeyError as err:
        connection.send_error(msg["id"], "not_found", f"Unknown board id: {err}")
        return

    connection.send_result(msg["id"], {"column": column.to_dict()})


@websocket_api.websocket_command(
    {
        "type": f"{DOMAIN}/delete_column",
        "column_id": str,
    }
)
@websocket_api.async_response
async def websocket_delete_column(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Delete a column and all tasks within it.

    Required fields: ``column_id``.
    """

    manager = _get_manager(hass)
    if manager is None:
        connection.send_error(msg["id"], "not_initialized", "DoBeeDo manager not available")
        return

    try:
        await manager.async_delete_column(msg["column_id"])
    except KeyError as err:
        connection.send_error(msg["id"], "not_found", f"Unknown id: {err}")
        return

    connection.send_result(msg["id"], {"success": True})


@websocket_api.websocket_command(
    {
        "type": f"{DOMAIN}/delete_board",
        "board_id": str,
    }
)
@websocket_api.async_response
async def websocket_delete_board(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Delete a board and all of its columns and tasks.

    Required fields: ``board_id``.
    """

    manager = _get_manager(hass)
    if manager is None:
        connection.send_error(msg["id"], "not_initialized", "DoBeeDo manager not available")
        return

    try:
        await manager.async_delete_board(msg["board_id"])
    except KeyError as err:
        connection.send_error(msg["id"], "not_found", f"Unknown id: {err}")
        return

    connection.send_result(msg["id"], {"success": True})


@websocket_api.websocket_command({"type": f"{DOMAIN}/subscribe_updates"})
@websocket_api.async_response
async def websocket_subscribe_updates(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Subscribe the connection to DoBeeDo update events.

    This subscribes the WebSocket connection to the internal DoBeeDo
    board/task events and forwards them under a single event envelope:

    .. code-block:: json

        {
          "type": "dobeedo/event",
          "event_type": "task_created" | "task_updated" | ...,
          "payload": {...}
        }
    """

    event_map: dict[str, str] = {
        EVENT_BOARD_CREATED: "board_created",
        EVENT_BOARD_UPDATED: "board_updated",
        EVENT_BOARD_DELETED: "board_deleted",
        EVENT_COLUMN_CREATED: "column_created",
        EVENT_TASK_CREATED: "task_created",
        EVENT_TASK_UPDATED: "task_updated",
        EVENT_TASK_DELETED: "task_deleted",
        EVENT_TASK_MOVED: "task_moved",
    }

    def _forward_event(event):  # type: ignore[no-untyped-def]
        event_type = event.event_type
        kind = event_map.get(event_type)
        if kind is None:
            return
        connection.send_message(
            {
                "id": msg["id"],
                "type": f"{DOMAIN}/event",
                "event_type": kind,
                "payload": event.data,
            }
        )

    # Register listeners for each event type and remember the unsubscribe
    # callbacks on the connection so they are cleaned up automatically.
    listeners: list[callable[[], None]] = []
    for ha_event in event_map:
        listeners.append(hass.bus.async_listen(ha_event, _forward_event))

    def _unsubscribe() -> None:
        for unsub in listeners:
            unsub()

    connection.subscriptions[msg["id"]] = _unsubscribe
    connection.send_result(msg["id"], {"success": True})


@websocket_api.websocket_command({
    "type": f"{DOMAIN}/list_todo_entities",
})
@websocket_api.async_response
async def websocket_list_todo_entities(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """List all available todo entities in Home Assistant.

    Returns a list of todo entities with their friendly names and IDs.
    """
    todo_entities = []

    # Get all todo entities from state registry
    for state in hass.states.async_all("todo"):
        todo_entities.append({
            "entity_id": state.entity_id,
            "name": state.attributes.get("friendly_name", state.entity_id),
            "state": state.state,
        })

    connection.send_result(msg["id"], {"entities": todo_entities})


@websocket_api.websocket_command({
    "type": f"{DOMAIN}/import_from_todo",
    "entity_id": str,
    "board_id": str,
    "column_id": str,
    Optional("status_filter"): str,  # "needs_action", "completed", or None for all
})
@websocket_api.async_response
async def websocket_import_from_todo(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Import items from a Home Assistant todo entity into a DoBeeDo column.

    Required fields: ``entity_id``, ``board_id``, ``column_id``.
    Optional fields: ``status_filter``.
    """
    manager = _get_manager(hass)
    if manager is None:
        connection.send_error(msg["id"], "not_initialized", "DoBeeDo manager not available")
        return

    entity_id = msg["entity_id"]
    board_id = msg["board_id"]
    column_id = msg["column_id"]
    status_filter = msg.get("status_filter")

    # Verify the todo entity exists
    if not hass.states.get(entity_id):
        connection.send_error(msg["id"], "entity_not_found", f"Todo entity {entity_id} not found")
        return

    try:
        # Call the todo.get_items service to fetch items
        response = await hass.services.async_call(
            "todo",
            "get_items",
            {"entity_id": entity_id},
            blocking=True,
            return_response=True,
        )

        items = response.get(entity_id, {}).get("items", [])

        # Filter by status if requested
        if status_filter:
            items = [item for item in items if item.get("status") == status_filter]

        # Import each item as a task
        imported_count = 0
        for item in items:
            summary = item.get("summary", "")
            if not summary:
                continue

            description = item.get("description")
            due_date = item.get("due")

            await manager.async_create_task(
                board_id,
                column_id,
                summary,
                description=description,
                due_date=due_date,
            )
            imported_count += 1

        connection.send_result(msg["id"], {
            "success": True,
            "imported_count": imported_count,
        })

    except Exception as err:
        connection.send_error(msg["id"], "import_failed", str(err))
        return


def async_register_api(hass: HomeAssistant) -> None:
    """Register DoBeeDo WebSocket commands with Home Assistant."""

    websocket_api.async_register_command(hass, websocket_get_boards)
    websocket_api.async_register_command(hass, websocket_create_board)
    websocket_api.async_register_command(hass, websocket_get_tasks)
    websocket_api.async_register_command(hass, websocket_get_columns)
    websocket_api.async_register_command(hass, websocket_create_column)
    websocket_api.async_register_command(hass, websocket_create_task)
    websocket_api.async_register_command(hass, websocket_update_task)
    websocket_api.async_register_command(hass, websocket_move_task)
    websocket_api.async_register_command(hass, websocket_delete_task)
    websocket_api.async_register_command(hass, websocket_delete_column)
    websocket_api.async_register_command(hass, websocket_delete_board)
    websocket_api.async_register_command(hass, websocket_subscribe_updates)
    websocket_api.async_register_command(hass, websocket_list_todo_entities)
    websocket_api.async_register_command(hass, websocket_import_from_todo)
