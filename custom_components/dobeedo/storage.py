"""Storage helper for the DoBeeDo integration.

This module wraps Home Assistant's storage helper to persist the
integration's data model. For the Phase 1 backend MVP we keep the
schema intentionally simple but versioned so it can evolve safely.
"""
from __future__ import annotations

from dataclasses import asdict
from typing import Any, Dict, List, Optional, TypedDict

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION
from .model import Board, Column, Task


class DobeeDoStorageData(TypedDict):
    """Typed representation of the root storage schema."""

    schema_version: int
    boards: List[Dict[str, Any]]
    columns: List[Dict[str, Any]]
    tasks: List[Dict[str, Any]]


class DobeeDoStorage:
    """Wrapper around Home Assistant's Store for DoBeeDo data."""

    def __init__(
        self,
        hass: HomeAssistant,
        key: str | None = None,
        version: int | None = None,
    ) -> None:
        """Create a new DobeeDoStorage.

        ``key`` and ``version`` default to the integration's constants
        so tests can override them if needed.
        """

        store_key = key or STORAGE_KEY
        store_version = version or STORAGE_VERSION
        self._store: Store[DobeeDoStorageData] = Store(hass, store_version, store_key)

    async def async_load(self) -> Optional[DobeeDoStorageData]:
        """Load data from disk.

        Returns ``None`` if no data has been stored yet.
        """

        raw = await self._store.async_load()
        if raw is None:
            return None

        return self._migrate(raw)

    async def async_save(self, data: DobeeDoStorageData) -> None:
        """Persist data to disk."""

        await self._store.async_save(data)

    def _migrate(self, data: Dict[str, Any]) -> DobeeDoStorageData:
        """Migrate raw storage data to the current schema.

        For the initial version this is effectively a normalisation
        step that ensures required keys are present and assigns the
        current ``schema_version`` if missing.
        """

        schema_version = int(data.get("schema_version", STORAGE_VERSION))

        if schema_version != STORAGE_VERSION:
            # No older schema versions exist yet; future versions can
            # add explicit migration logic here based on the stored
            # ``schema_version``.
            schema_version = STORAGE_VERSION

        boards = list(data.get("boards", []))
        columns = list(data.get("columns", []))
        tasks = list(data.get("tasks", []))

        migrated: DobeeDoStorageData = {
            "schema_version": schema_version,
            "boards": boards,
            "columns": columns,
            "tasks": tasks,
        }

        return migrated


def serialize_model(
    boards: List[Board], columns: List[Column], tasks: List[Task]
) -> DobeeDoStorageData:
    """Serialize model objects into storage data.

    This helper is provided so the manager can easily turn its
    in-memory collections into a structure suitable for ``async_save``.
    """

    return {
        "schema_version": STORAGE_VERSION,
        "boards": [b.to_dict() for b in boards],
        "columns": [c.to_dict() for c in columns],
        "tasks": [t.to_dict() for t in tasks],
    }


def deserialize_model(data: DobeeDoStorageData) -> tuple[List[Board], List[Column], List[Task]]:
    """Deserialize storage data into model objects."""

    boards = [Board.from_dict(item) for item in data.get("boards", [])]
    columns = [Column.from_dict(item) for item in data.get("columns", [])]
    tasks = [Task.from_dict(item) for item in data.get("tasks", [])]
    return boards, columns, tasks

