"""Home Assistant services for the DoBeeDo integration."""
from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.const import ATTR_ENTITY_ID
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import HomeAssistantError
import homeassistant.helpers.config_validation as cv

from .const import DOMAIN
from .coordinator import DobeeDoManager


ATTR_BOARD_ID = "board_id"
ATTR_BOARD_NAME = "name"
ATTR_BOARD_DESCRIPTION = "description"

ATTR_COLUMN_NAME = "name"
ATTR_COLUMN_ORDER_INDEX = "order_index"

ATTR_TASK_ID = "task_id"
ATTR_COLUMN_ID = "column_id"
ATTR_TASK_TITLE = "title"
ATTR_TASK_DESCRIPTION = "description"
ATTR_TARGET_COLUMN_ID = "target_column_id"
ATTR_TARGET_SORT_INDEX = "target_sort_index"


def _get_manager(hass: HomeAssistant) -> DobeeDoManager:
    """Return the DobeeDoManager or raise if not initialised."""

    domain_data = hass.data.get(DOMAIN) or {}
    for entry_data in domain_data.values():
        manager = entry_data.get("manager")
        if isinstance(manager, DobeeDoManager):
            return manager

    raise HomeAssistantError("DoBeeDo manager not initialised")


async def _async_handle_create_board(hass: HomeAssistant, call: ServiceCall) -> None:
    manager = _get_manager(hass)
    await manager.async_create_board(
        name=call.data[ATTR_BOARD_NAME],
        description=call.data.get(ATTR_BOARD_DESCRIPTION),
    )


async def _async_handle_update_board(hass: HomeAssistant, call: ServiceCall) -> None:
    manager = _get_manager(hass)
    board_id = call.data[ATTR_BOARD_ID]

    updates: dict[str, Any] = {}
    if ATTR_BOARD_NAME in call.data:
        updates[ATTR_BOARD_NAME] = call.data[ATTR_BOARD_NAME]
    if ATTR_BOARD_DESCRIPTION in call.data:
        updates[ATTR_BOARD_DESCRIPTION] = call.data[ATTR_BOARD_DESCRIPTION]

    try:
        await manager.async_update_board(board_id, **updates)
    except KeyError as err:
        raise HomeAssistantError(f"Unknown board id: {err}") from err


async def _async_handle_create_column(hass: HomeAssistant, call: ServiceCall) -> None:
    """Create a new column on a board."""

    manager = _get_manager(hass)
    board_id = call.data[ATTR_BOARD_ID]
    name = call.data[ATTR_COLUMN_NAME]
    order_index = call.data.get(ATTR_COLUMN_ORDER_INDEX)

    try:
        await manager.async_create_column(board_id, name, order_index=order_index)
    except KeyError as err:
        raise HomeAssistantError(f"Unknown board id: {err}") from err


async def _async_handle_create_task(hass: HomeAssistant, call: ServiceCall) -> None:
    manager = _get_manager(hass)

    try:
        await manager.async_create_task(
            call.data[ATTR_BOARD_ID],
            call.data[ATTR_COLUMN_ID],
            call.data[ATTR_TASK_TITLE],
            description=call.data.get(ATTR_TASK_DESCRIPTION),
        )
    except KeyError as err:
        raise HomeAssistantError(f"Unknown id: {err}") from err


async def _async_handle_update_task(hass: HomeAssistant, call: ServiceCall) -> None:
    manager = _get_manager(hass)
    task_id = call.data[ATTR_TASK_ID]

    updates: dict[str, Any] = {}
    if ATTR_TASK_TITLE in call.data:
        updates[ATTR_TASK_TITLE] = call.data[ATTR_TASK_TITLE]
    if ATTR_TASK_DESCRIPTION in call.data:
        updates[ATTR_TASK_DESCRIPTION] = call.data[ATTR_TASK_DESCRIPTION]

    try:
        await manager.async_update_task(task_id, **updates)
    except KeyError as err:
        raise HomeAssistantError(f"Unknown task id: {err}") from err


async def _async_handle_move_task(hass: HomeAssistant, call: ServiceCall) -> None:
    manager = _get_manager(hass)

    try:
        await manager.async_move_task(
            call.data[ATTR_TASK_ID],
            call.data[ATTR_TARGET_COLUMN_ID],
            target_sort_index=call.data.get(ATTR_TARGET_SORT_INDEX),
        )
    except KeyError as err:
        raise HomeAssistantError(f"Unknown id: {err}") from err


async def _async_handle_delete_task(hass: HomeAssistant, call: ServiceCall) -> None:
    manager = _get_manager(hass)

    try:
        await manager.async_delete_task(call.data[ATTR_TASK_ID])
    except KeyError as err:
        raise HomeAssistantError(f"Unknown task id: {err}") from err


CREATE_BOARD_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_BOARD_NAME): cv.string,
        vol.Optional(ATTR_BOARD_DESCRIPTION): cv.string,
    }
)

CREATE_COLUMN_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_BOARD_ID): cv.string,
        vol.Required(ATTR_COLUMN_NAME): cv.string,
        vol.Optional(ATTR_COLUMN_ORDER_INDEX): cv.positive_int,
    }
)

UPDATE_BOARD_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_BOARD_ID): cv.string,
        vol.Optional(ATTR_BOARD_NAME): cv.string,
        vol.Optional(ATTR_BOARD_DESCRIPTION): cv.string,
    }
)

CREATE_TASK_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_BOARD_ID): cv.string,
        vol.Required(ATTR_COLUMN_ID): cv.string,
        vol.Required(ATTR_TASK_TITLE): cv.string,
        vol.Optional(ATTR_TASK_DESCRIPTION): cv.string,
    }
)

UPDATE_TASK_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_TASK_ID): cv.string,
        vol.Optional(ATTR_TASK_TITLE): cv.string,
        vol.Optional(ATTR_TASK_DESCRIPTION): cv.string,
    }
)

MOVE_TASK_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_TASK_ID): cv.string,
        vol.Required(ATTR_TARGET_COLUMN_ID): cv.string,
        vol.Optional(ATTR_TARGET_SORT_INDEX): cv.positive_int,
    }
)

DELETE_TASK_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_TASK_ID): cv.string,
    }
)


def async_register_services(hass: HomeAssistant) -> None:
    """Register DoBeeDo services with Home Assistant."""

    hass.services.async_register(
        DOMAIN,
        "create_board",
        _async_handle_create_board,
        schema=CREATE_BOARD_SCHEMA,
    )

    hass.services.async_register(
        DOMAIN,
        "create_column",
        _async_handle_create_column,
        schema=CREATE_COLUMN_SCHEMA,
    )

    hass.services.async_register(
        DOMAIN,
        "update_board",
        _async_handle_update_board,
        schema=UPDATE_BOARD_SCHEMA,
    )

    hass.services.async_register(
        DOMAIN,
        "create_task",
        _async_handle_create_task,
        schema=CREATE_TASK_SCHEMA,
    )

    hass.services.async_register(
        DOMAIN,
        "update_task",
        _async_handle_update_task,
        schema=UPDATE_TASK_SCHEMA,
    )

    hass.services.async_register(
        DOMAIN,
        "move_task",
        _async_handle_move_task,
        schema=MOVE_TASK_SCHEMA,
    )

    hass.services.async_register(
        DOMAIN,
        "delete_task",
        _async_handle_delete_task,
        schema=DELETE_TASK_SCHEMA,
    )
