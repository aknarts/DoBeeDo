"""Basic smoke test to ensure the DoBeeDo integration package is present.

These tests are intentionally minimal and will be expanded as the integration
is implemented.
"""

import importlib


def test_import_custom_component_namespace() -> None:
    """Ensure the custom component namespace and module path exist.

    This test only checks that the module can be resolved by Python without
    importing Home Assistant itself, so it is safe to run outside an HA
    environment.
    """

    # The module spec should be discoverable even if importing it would fail
    # due to missing Home Assistant dependencies.
    spec = importlib.util.find_spec("custom_components.dobeedo")
    assert spec is not None
