"""WebSocket API tests for the DoBeeDo integration.

These tests verify that the ``dobeedo/get_boards`` command returns data
from the DobeeDoManager that is wired into the config entry setup.
"""
from __future__ import annotations

import pytest

homeassistant = pytest.importorskip("homeassistant")  # noqa: F401

from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
from homeassistant.components.websocket_api import async_apply_connection
from homeassistant.components.websocket_api.http import HomeAssistantWebSocket

from custom_components.dobeedo.const import DOMAIN


@pytest.mark.asyncio
async def test_websocket_get_boards(hass: HomeAssistant, hass_ws_client) -> None:
    """The get_boards WebSocket command should return at least the default board."""

    # Set up the websocket_api component and the custom integration.
    assert await async_setup_component(hass, "websocket_api", {})

    # Simulate that the integration has been set up via config entry.
    # The existing import test ensures the integration can be loaded;
    # here we directly call its setup entry to register data and panel.
    from custom_components.dobeedo import async_setup_entry  # type: ignore

    class DummyConfigEntry:
        entry_id = "test_entry"

    await async_setup_entry(hass, DummyConfigEntry())

    # Open a WebSocket connection.
    client = await hass_ws_client(hass)

    # Send the get_boards command.
    await client.send_json({"id": 1, "type": f"{DOMAIN}/get_boards"})
    msg = await client.receive_json()

    assert msg["success"] is True
    boards = msg["result"]["boards"]

    # We seeded a default board in async_setup_entry, so at least one
    # board should be present.
    assert isinstance(boards, list)
    assert len(boards) >= 1
    assert boards[0]["name"] == "My Board"

