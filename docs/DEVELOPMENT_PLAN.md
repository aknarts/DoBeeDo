# DoBeeDo Development Plan

This document describes the technical plan for implementing DoBeeDo, a Home Assistant custom integration and frontend panel for kanban-style task management.

It’s organized into phases and concrete tasks that can be turned into GitHub issues.

> Status legend:
> - [x] done
> - [ ] not started
> - [ ] (stub) implemented as placeholder; will be replaced with real logic later

---

## Phase 0 – Repository Scaffolding

- [x] Add basic project structure:
  - [x] `custom_components/dobeedo/`
  - [x] `docs/`
  - [x] `tests/`
- [x] Add minimal tooling/configuration:
  - [x] `.gitignore`
  - [x] `pyproject.toml` for pytest and basic lint config.
  - [ ] Basic CI workflow (optional initially).

---

## Phase 1 – Backend Integration MVP

> Note: Some of this phase is partially stubbed. The WebSocket API and
> integration scaffolding exist, but the real domain model and storage are not
> yet implemented.

### 1.1 Domain Model & Storage

- [ ] Define core Python data structures in `model.py`:
  - [ ] `Board`
  - [ ] `Column`
  - [ ] `Task`
  - [ ] `ChecklistItem`
  - [ ] `EntityLink`
- [ ] Implement storage layer in `storage.py`:
  - [ ] Use `homeassistant.helpers.storage.Store`.
  - [ ] Define root storage schema with `schema_version`.
  - [ ] Implement `async_load` / `async_save` and migration hooks.
- [ ] Implement a central manager class (e.g., `DobeeDoManager`) in `coordinator.py`:
  - [ ] Keep in-memory collections of boards and tasks.
  - [ ] Provide async CRUD methods for boards, columns, and tasks.
  - [ ] Handle ordering within boards/columns.
  - [ ] Emit HA events on changes.

### 1.2 Integration Skeleton

- [x] Create `manifest.json` with basic metadata.
- [x] Implement `__init__.py`:
  - [x] Domain constant and setup functions.
  - [x] `async_setup_entry` to create data namespace and register APIs/panel.
  - [x] `async_unload_entry` to clean up.
- [x] Create `const.py` for:
  - [x] Domain name
  - [x] Storage key and version
  - [x] Event names
- [x] Add `config_flow.py`:
  - [x] Single-instance config flow.
  - [x] No options yet; simple confirmation step.

### 1.3 Services

- [ ] Implement service registration and handlers in `services.py`:

  - [ ] `dobeedo.create_board`
  - [ ] `dobeedo.update_board`
  - [ ] `dobeedo.create_task`
  - [ ] `dobeedo.update_task`
  - [ ] `dobeedo.move_task`
  - [ ] `dobeedo.delete_task`

  For each service:

  - [ ] Define `voluptuous` schemas.
  - [ ] Wire handlers to `DobeeDoManager` methods.
  - [ ] Add basic logging and error handling.

### 1.4 WebSocket API

- [x] Add a WebSocket API module in `api.py`:
  - [x] Register commands via `websocket_api.async_register_command`.
  - [x] Implement handler for:
    - [x] `dobeedo/get_boards` (stub: returns a static example board).
- [ ] Extend handlers for:
  - [ ] `dobeedo/get_board`
  - [ ] `dobeedo/get_tasks`
  - [ ] `dobeedo/create_task`
  - [ ] `dobeedo/update_task`
  - [ ] `dobeedo/move_task`
- [ ] Implement a `subscribe` command:
  - [ ] `dobeedo/subscribe_updates`
  - [ ] Forward relevant change events or minimal payload updates to clients.

### 1.5 Tests (Backend MVP)

Under `tests/components/dobeedo/`:

- [ ] Test model behavior:
  - [ ] Create/update/delete boards.
  - [ ] Add/move tasks between columns.
- [ ] Test storage load/save and simple migration.
- [ ] Test services:
  - [ ] Successful calls and expected model changes.
  - [ ] Validation errors for bad input.
- [ ] Test WebSocket handlers using HA’s test helpers:
  - [ ] `dobeedo/get_boards` (real data once model exists).
  - [ ] Additional commands as they are added.
- [x] Add a basic smoke test:
  - [x] Ensure the `custom_components.dobeedo` package is discoverable without importing Home Assistant itself.

---

## Phase 2 – Frontend Panel MVP

### 2.1 Frontend Tooling

- [x] Create a `frontend/` directory for UI source.
- [x] Initialize a TypeScript project:
  - [x] `package.json`
  - [x] `tsconfig.json`
  - [x] Build config (`vite.config.ts`).
- [x] Add dependencies:
  - [x] `lit` for web components.
  - [x] TypeScript, Vite, Vitest as dev dependencies.
- [x] Decide output paths:
  - [x] Panel bundle: `custom_components/dobeedo/www/dobee-do-panel.js` via Vite build.
  - [ ] Card bundle(s): `custom_components/dobeedo/www/dobee-do-cards.js`.

### 2.2 Panel Registration

- [x] Implement `panel.py` in the backend:
  - [x] Register a sidebar panel via Home Assistant’s frontend API.
  - [x] Use an appropriate icon (e.g., `mdi:view-kanban`).
  - [x] Point to the built panel JS resource via `/local/dobeedo/dobee-do-panel.js` (served from `<config>/www/dobeedo`).
- [ ] Refine static asset serving:
  - [ ] Decide on final deployment strategy so HACS installs ship the bundle in a location that does not require a manual copy into `/config/www`.
  - [ ] Update docs and/or build pipeline accordingly.

### 2.3 Panel Shell & Routing

- [x] Create a main panel component in `frontend/src/panel/dobee-do-panel.ts` that:
  - [x] Registers a `dobeedo-panel` custom element.
  - [x] Accepts a `hass` property.
  - [x] Renders a placeholder panel UI.
- [ ] Add internal routing (board list, board view, settings).
- [ ] Fetch initial data (boards + selected board’s tasks) via the WebSocket API.

### 2.4 Basic Board UI

- [ ] `board-view` component:
  - [ ] Display columns in order.
  - [ ] Render task cards within columns.
  - [ ] Provide a simple form to add a task to a column.
- [ ] `task-card` component:
  - [ ] Display title, short description/summary, and key badges (tags, due date).
  - [ ] Open a dialog when clicked.
- [ ] `task-details-dialog` component:
  - [ ] Edit title, description, column, due date, tags.
  - [ ] Save/cancel actions wired to the API client.

### 2.5 Frontend API Client

- [x] Implement `api/dobeedo-api.ts`:
  - [x] Wrap HA’s WebSocket connection for DoBeeDo commands.
  - [x] Provide a typed method for:
    - [x] Fetching boards (`getBoards`) matching the stubbed backend API.
- [ ] Extend the client as backend commands are added:
  - [ ] `getBoard`
  - [ ] `getTasksForBoard`
  - [ ] `createTask`
  - [ ] `updateTask`
  - [ ] `moveTask`
- [x] Integrate the client into the panel:
  - [x] Use `DoBeeDoApiClient` inside `dobeedo-panel` to load boards on startup.
  - [x] Render the list of boards in the panel UI.

### 2.6 Tests (Frontend MVP)

- [ ] Setup Jest/Vitest config for running unit tests (Vitest is already a dependency).
- [ ] Add minimal tests for:
  - [ ] API client (`getBoards` happy path, error handling when response is malformed).
  - [ ] `dobeedo-panel` basic rendering (once it consumes real data).
  - [ ] Future components (`board-view`, `task-card`) as they are introduced.

---

## Phase 3 – Interactions & HA Integrations

### 3.1 Drag-and-Drop

- [ ] Evaluate options for drag-and-drop:
  - [ ] Native pointer events with custom logic.
  - [ ] A small DnD helper library that works in HA’s environment.
- [ ] Implement drag-and-drop movement of tasks between columns:
  - [ ] Update `sort_index`/order when tasks move.
  - [ ] Call `move_task` backend API on drop.
  - [ ] Provide keyboard-accessible fallback (e.g., "Move to…" menu).

### 3.2 Subtasks and Comments

- [ ] Extend backend model to support checklist items.
- [ ] Expose checklist via WebSocket and services.
- [ ] Update UI to show and toggle checklist items.
- [ ] Add a basic comments field/list to the task details dialog.

### 3.3 Entity Linking and Automation Hooks

- [ ] Extend model to support `entity_links` and `auto_complete_condition`.
- [ ] Add service/API fields to manage these.
- [ ] Add UI controls to:
  - [ ] Select entities to link to a task.
  - [ ] Configure optional auto-complete state condition.
- [ ] In backend:
  - [ ] Listen for relevant state changes.
  - [ ] Mark tasks as done when auto-complete conditions are met.
- [ ] Fire HA events on key lifecycle actions.
- [ ] Add example automations in documentation.

### 3.4 Lovelace Cards

- [ ] `dobee-do-board-card`:
  - [ ] Config options: `board_id`, optional column filters and max tasks.
  - [ ] Read-only board snapshot with quick navigation to full panel.
- [ ] `dobee-do-my-tasks-card`:
  - [ ] Config options: `assignee`, optional tags/due filters.
  - [ ] List of tasks with simple complete/quick open actions.
- [ ] Register cards with Lovelace and ensure they show up as custom cards.

---

## Phase 4 – Polish, Settings, and Release

### 4.1 Settings View

- [ ] Implement a `settings-view` within the panel:
  - [ ] Manage boards (create, rename, delete, re-order).
  - [ ] Manage columns per board (rename, add, delete, set WIP limit and color).
  - [ ] Global defaults (e.g., default column names for new boards).

### 4.2 Import/Export

- [ ] Backend services or WebSocket methods for:
  - [ ] Export workspace/board as YAML or JSON.
  - [ ] Import workspace/board from provided data.
- [ ] UI buttons in the settings view to trigger import/export.

### 4.3 Performance & UX

- [ ] Handle large boards gracefully (basic pagination or “load more”).
- [ ] Improve keyboard navigation and ARIA attributes for accessibility.
- [ ] Refine visual design to match HA themes (light/dark).

### 4.4 Packaging and HACS

- [ ] Add `hacs.json` with metadata.
- [ ] Ensure repo layout matches HACS expectations.
- [ ] Tag releases and maintain a `CHANGELOG.md`.

---

## Open Questions & Decisions

These are areas to refine as implementation continues. Feel free to adjust and extend.

1. **Frontend stack details**
   - Lit is chosen; confirm any additional helper libraries (for routing, drag-and-drop) before adding dependencies.
2. **Task volume expectations**
   - Household use is the target, but some households may be large. This influences whether we preemptively add pagination/virtualization.
3. **Per-user preferences storage**
   - Decide whether to use HA’s user storage (if available) or browser local storage for panel filters.
4. **Static asset serving vs `/local` path**
   - Finalize whether DoBeeDo should rely on `/local` for the panel bundle in production, or use an integration-local static path served from `custom_components/dobeedo/www`.

---

This plan is intentionally implementation-oriented. As we build out the codebase, we should keep this document in sync by marking tasks as done, noting stubs, and adding new items when we introduce new modules or behavior.
