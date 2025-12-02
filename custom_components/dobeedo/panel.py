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
STATIC_PATH = f"/dobeedo/{DOMAIN}"  # URL prefix for integration-local static assets


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the DoBeeDo panel with the Home Assistant frontend.

    The frontend build outputs a bundle named ``dobee-do-panel.js`` into the
    integration's ``www`` directory under ``custom_components/dobeedo/www``.

    We expose that directory via ``frontend.async_register_static_path`` so it
    becomes accessible under ``/dobeedo/dobeedo`` (``STATIC_PATH``), and then
    point the panel's ``module_url`` at that location. This avoids relying on
    ``/local`` and any manual copy step into ``<config>/www``.
    """

    # Ensure the panel is only registered once.
    if hass.data.get(f"{DOMAIN}_panel_registered"):
        return

    # Serve the integration's www directory under a stable URL prefix.
    frontend.async_register_static_path(
        hass,
        STATIC_PATH,
        hass.config.path("custom_components/dobeedo/www"),
        cache_headers=False,
    )

    frontend.async_register_built_in_panel(
        hass,
        component_name="custom",
        frontend_url_path=DOMAIN,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        config={
            # Load the panel bundle directly from the integration's static path.
            "module_url": f"{STATIC_PATH}/dobee-do-panel.js",
        },
        require_admin=False,
    )

    hass.data[f"{DOMAIN}_panel_registered"] = True
