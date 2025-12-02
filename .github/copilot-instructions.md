# GitHub Copilot – Project Instructions

These notes are for AI coding assistants working on the DoBeeDo project. They describe the architecture, conventions, and priorities to follow when generating or editing code.

Update the plan as the project evolves, the plan is tored in docs/DEVELOPMENT_PLAN.md with more detail.
Keep responses short and focused on the code changes requested.
If unsure ask questions or clarifications.

## Project Summary

DoBeeDo is a Home Assistant custom integration that provides a kanban-style task management experience directly in Home Assistant. The project consists of:

- A **backend** custom component (`custom_components/dobeedo/`) implemented in Python.
- A **frontend** panel and custom Lovelace cards implemented in TypeScript using web components (Lit recommended).

The main features include dynamic boards and columns, drag-and-drop task management, subtasks, comments, assignments, and links to Home Assistant entities and automations.

## High-Level Architecture

- **Domain:** `dobeedo`.
- **Backend:**
  - Uses Home Assistant’s storage helper (`homeassistant.helpers.storage.Store`) for persisting boards and tasks.
  - Exposes Home Assistant services for CRUD operations on boards and tasks.
  - Provides a WebSocket API for the frontend to fetch and mutate data.
  - Registers a custom panel in the HA sidebar and serves static frontend assets.
- **Frontend:**
  - Implemented as TypeScript web components.
  - Communicates with the backend via Home Assistant’s WebSocket connection.
  - Provides a full-page panel and custom Lovelace cards.

## Coding Conventions

- **Python (backend)**
  - Follow Home Assistant’s integration guidelines and directory structure.
  - Prefer `async`/`await` and non-blocking I/O; avoid blocking calls in the event loop.
  - Keep integration state in a central manager/coordinator object instead of scattering logic.
  - Use `voluptuous` for service schemas and validation.
  - Emit events on meaningful changes (task created/updated/moved, board changes).

- **TypeScript (frontend)**
  - Prefer Lit-based web components.
  - Treat the Home Assistant `hass` object as the main entry point for state and WebSocket access.
  - Keep UI logic in components and interaction with HA in a small client helper module.
  - Maintain strong typing for API payloads shared with the backend.

- **General**
  - Favor small, composable modules and clear boundaries (model vs storage vs API vs UI).
  - Write tests alongside new code (Python `pytest` for backend, Jest/Vitest for frontend).
  - Avoid unnecessary dependencies, especially on the backend where HA already provides many helpers.

## Assistant Priorities

When generating or editing code in this repo, AI assistants should:

1. **Respect Home Assistant conventions**
   - Use appropriate file/layout patterns under `custom_components/`.
   - Use HA helpers for storage, logging, and WebSocket APIs.

2. **Preserve public APIs and schemas**
   - Be cautious when changing service signatures or WebSocket message formats.
   - If a breaking change is unavoidable, add clear upgrade notes in the docs.

3. **Keep the UX coherent**
   - Frontend changes should maintain consistent look-and-feel with the rest of the panel and HA.
   - Reuse existing components and styles when possible.

4. **Add tests for non-trivial changes**
   - For new backend logic, add or extend tests under `tests/`.
   - For frontend logic, add or update unit tests for API helpers and components.

5. **Document relevant behavior**
   - Update `README.md`, `docs/DEVELOPMENT_PLAN.md`, or other docs when modifying behavior or adding features.

## Suggested Workflows

When working on a feature, assistants should generally:

1. Check `docs/DEVELOPMENT_PLAN.md` to understand the current roadmap.
2. Identify the relevant backend and/or frontend modules.
3. Implement changes in small, reviewable steps.
4. Run tests and linters locally and fix issues.
5. Update documentation if behavior or configuration changes.

## Notes for Tooling

- Prefer minimal, widely-used tools for build and test. For example:
  - Backend: `pytest`, `ruff` or `flake8`.
  - Frontend: `vite` or `rollup` + `ts-jest`/`vitest`.
- Do not introduce heavy dependencies without a strong justification.

If there is any ambiguity about Home Assistant APIs or behavior, prefer checking the official Home Assistant developer documentation and mirroring patterns from core integrations.

