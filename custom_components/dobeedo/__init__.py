"""DoBeeDo Home Assistant integration.

This module sets up the DoBeeDo integration, which provides a kanban-style
task board experience inside Home Assistant.
"""
from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

from .const import DOMAIN
from .panel import async_register_panel
from .api import async_register_api
from .coordinator import DobeeDoManager
from .services import async_register_services


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the DoBeeDo integration from YAML (not used).

    The integration is intended to be configured via the UI; YAML setup is
    currently a no-op but must return True for Home Assistant to continue
    startup cleanly.
    """

    # Nothing to do for YAML setup at the moment.
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up DoBeeDo from a config entry."""

    hass.data.setdefault(DOMAIN, {})

    # Create the central manager for this config entry.
    manager = DobeeDoManager(hass)

    # Load persisted data from storage.
    await manager.async_load_from_storage()

    # Optionally seed a default board/column if no data exists yet.
    # Errors here should not block setup, hence the minimal try/except.
    boards = await manager.async_get_boards()
    if not boards:
        try:
            board = await manager.async_create_board("My Board")
            await manager.async_create_column(board.id, "To do")
        except Exception:  # pragma: no cover - defensive, should not happen
            # Log via Home Assistant's logger once available; for now we
            # simply proceed with an empty manager.
            pass

    hass.data[DOMAIN][entry.entry_id] = {"manager": manager}

    # Register services that expose DoBeeDo operations to automations.
    async_register_services(hass)

    # Register the sidebar panel so users can access the DoBeeDo UI.
    await async_register_panel(hass)

    # Register WebSocket API commands for the frontend.
    async_register_api(hass)

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a DoBeeDo config entry."""

    hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)

    return True
