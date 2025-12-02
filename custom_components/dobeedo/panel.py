"""Panel registration for the DoBeeDo integration.

This module is responsible for registering the custom DoBeeDo panel in the
Home Assistant sidebar. The panel is implemented as a web component bundle
built by the frontend project and served as a static asset.
"""
from __future__ import annotations

from homeassistant.components import frontend
from homeassistant.core import HomeAssistant

from .const import DOMAIN


PANEL_TITLE = "DoBeeDo"
PANEL_ICON = "mdi:view-kanban"


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the DoBeeDo panel with the Home Assistant frontend.

    The frontend build outputs a bundle named ``dobee-do-panel.js`` into the
    integration's ``www`` directory under ``custom_components/dobeedo/www``.

    For Home Assistant to serve this as a frontend resource, the same file
    should also be placed under the main config ``www/dobeedo`` directory,
    where it is available at ``/local/dobeedo/dobee-do-panel.js``.
    """

    # Ensure the panel is only registered once.
    if hass.data.get(f"{DOMAIN}_panel_registered"):
        return

    frontend.async_register_built_in_panel(
        hass,
        component_name="custom",
        frontend_url_path=DOMAIN,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        config={
            "module_url": "/local/dobeedo/dobee-do-panel.js",
            "embed_iframe": False,
            "trust_external": False,
            "panel": "dobeedo-panel",
        },
        require_admin=False,
    )

    hass.data[f"{DOMAIN}_panel_registered"] = True
