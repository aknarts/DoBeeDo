"""WebSocket API for the DoBeeDo integration.

This module defines a small set of WebSocket commands that the frontend can
use to interact with the DoBeeDo backend. For now the implementation is
placeholder-only and returns stubbed data so the frontend API client can be
wired and exercised without the full backend in place.
"""
from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.components import websocket_api

from .const import DOMAIN


@websocket_api.websocket_command({"type": f"{DOMAIN}/get_boards"})
@websocket_api.async_response
async def websocket_get_boards(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Return a list of boards.

    This is a stub implementation that returns a static example payload. It
    will be replaced with real data from the DoBeeDo manager once the backend
    model is implemented.
    """

    boards: list[dict[str, Any]] = [
        {
            "id": "example-board",
            "name": "Example Board",
            "description": "This is a placeholder board from the DoBeeDo stub API.",
        }
    ]

    connection.send_result(msg["id"], {"boards": boards})


def async_register_api(hass: HomeAssistant) -> None:
    """Register DoBeeDo WebSocket commands with Home Assistant."""

    websocket_api.async_register_command(hass, websocket_get_boards)

