"""Panel registration for the DoBeeDo integration.

This module is responsible for registering the custom DoBeeDo panel in the
Home Assistant sidebar. The panel is implemented as a web component bundle
built by the frontend project and served as a static asset.
"""
from __future__ import annotations

from homeassistant.components.frontend import async_register_built_in_panel
from homeassistant.core import HomeAssistant

from .const import DOMAIN


PANEL_TITLE = "DoBeeDo"
PANEL_ICON = "mdi:view-kanban"
# HACS exposes files under custom_components/<domain>/www as
# /hacsfiles/<domain>/... in the frontend. We ship the built panel bundle
# as custom_components/dobeedo/www/dobee-do-panel.js and load it via this URL.
PANEL_JS_URL = "/hacsfiles/dobeedo/dobee-do-panel.js"


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the DoBeeDo panel with the Home Assistant frontend.

    The frontend build outputs a bundle named ``dobee-do-panel.js`` into the
    integration's ``www`` directory under ``custom_components/dobeedo/www``.
    When installed via HACS, this directory is served under ``/hacsfiles/dobeedo``.

    We register a built-in panel that embeds a custom panel (`_panel_custom`)
    and points it at that JS entrypoint via ``js_url``. This mirrors the
    approach used by the HACS integration itself.
    """

    # Ensure the panel is only registered once.
    if hass.data.get(f"{DOMAIN}_panel_registered"):
        return

    async_register_built_in_panel(
        hass,
        component_name="custom",
        frontend_url_path=DOMAIN,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        config={
            "_panel_custom": {
                "name": "dobeedo-panel",
                "embed_iframe": True,
                "trust_external": False,
                "js_url": PANEL_JS_URL,
            }
        },
        require_admin=False,
    )

    hass.data[f"{DOMAIN}_panel_registered"] = True
