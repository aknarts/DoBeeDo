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
# NOTE: The panel bundle is expected to be served from /local/dobeedo/.
# That means the built JS file must exist at <config>/www/dobeedo/dobee-do-panel.js.
# In development, you can copy it from custom_components/dobeedo/www/ after running
# the frontend build. For HACS packaging, ship it directly under www/dobeedo/.
MODULE_URL = "/local/dobeedo/dobee-do-panel.js"


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the DoBeeDo panel with the Home Assistant frontend.

    The frontend build outputs a bundle named ``dobee-do-panel.js`` into the
    integration's ``www`` directory under ``custom_components/dobeedo/www``.

    For Home Assistant to serve this under ``/local/dobeedo/dobee-do-panel.js``,
    the same file must also exist under ``<config>/www/dobeedo``. This module
    only registers the panel and does not perform any file copying at runtime.
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
            "module_url": MODULE_URL,
        },
        require_admin=False,
    )

    hass.data[f"{DOMAIN}_panel_registered"] = True
