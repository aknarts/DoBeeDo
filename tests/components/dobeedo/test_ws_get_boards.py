"""WebSocket API tests for the DoBeeDo integration.

These tests require the full Home Assistant test harness and are
currently skipped in this environment. They are kept as a reference for
running inside a HA dev container.
"""
from __future__ import annotations

import pytest

pytest.skip("Home Assistant WebSocket tests require HA test harness", allow_module_level=True)

# The original test structure is preserved below for future use when
# running inside Home Assistant's test environment.
#
# from homeassistant.core import HomeAssistant
# from homeassistant.setup import async_setup_component
# from homeassistant.components.websocket_api import async_apply_connection
# from homeassistant.components.websocket_api.http import HomeAssistantWebSocket
#
# from custom_components.dobeedo.const import DOMAIN
#
#
# @pytest.mark.asyncio
# async def test_websocket_get_boards(hass: HomeAssistant, hass_ws_client) -> None:
#     """The get_boards WebSocket command should return at least the default board."""
#
#     assert await async_setup_component(hass, "websocket_api", {})
#
#     from custom_components.dobeedo import async_setup_entry  # type: ignore
#
#     class DummyConfigEntry:
#         entry_id = "test_entry"
#
#     await async_setup_entry(hass, DummyConfigEntry())
#
#     client = await hass_ws_client(hass)
#     await client.send_json({"id": 1, "type": f"{DOMAIN}/get_boards"})
#     msg = await client.receive_json()
#
#     assert msg["success"] is True
#     boards = msg["result"]["boards"]
#     assert isinstance(boards, list)
#     assert len(boards) >= 1
#     assert boards[0]["name"] == "My Board"
