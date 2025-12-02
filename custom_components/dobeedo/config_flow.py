"""Config flow for the DoBeeDo integration.

This provides a minimal UI-based configuration so that the integration can be
added from the Home Assistant UI. There are currently no user-facing options;
installing the integration simply enables the panel and backend.
"""
from __future__ import annotations

from typing import Any

from homeassistant import config_entries
from homeassistant.core import callback

from .const import DOMAIN


class DoBeeDoConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for DoBeeDo."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.FlowResult:
        """Handle the initial step initiated by the user.

        At this stage the integration does not need any options; we simply
        create a single config entry if one does not already exist.
        """

        # Only allow a single instance of the integration.
        existing_entries = self._async_current_entries()
        if existing_entries:
            return self.async_abort(reason="single_instance_allowed")

        if user_input is None:
            # Show a very simple confirmation form.
            return self.async_show_form(step_id="user", data_schema=None)

        return self.async_create_entry(title="DoBeeDo", data={})


@callback
def configured_instances(hass) -> set[str]:
    """Return a set of configured instance entry_ids.

    This helper makes it easy to check if the integration has already been
    configured elsewhere in the code if needed in the future.
    """

    return {entry.entry_id for entry in hass.config_entries.async_entries(DOMAIN)}

