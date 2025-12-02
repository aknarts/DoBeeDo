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
    hass.data[DOMAIN][entry.entry_id] = {}

    # Register the sidebar panel so users can access the DoBeeDo UI.
    await async_register_panel(hass)

    # Register WebSocket API commands for the frontend.
    async_register_api(hass)

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a DoBeeDo config entry."""

    hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)

    return True
