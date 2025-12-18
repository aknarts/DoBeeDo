# DoBeeDo Development Plan

This document describes the technical plan for implementing DoBeeDo, a Home Assistant custom integration and frontend panel for kanban-style task management.

It's organized into phases and concrete tasks that can be turned into GitHub issues.

> Status legend:
> - [x] done
> - [ ] not started
> - [ ] (stub) implemented as placeholder; will be replaced with real logic later

## Current Status (2025-01-18)

**Phase 0-2: Complete** - Core MVP is fully functional with persistent storage, real-time updates, and a polished UI.

**Phase 3: Mostly Complete** - Drag-and-drop, task metadata (priorities/tags/due dates), HA todo import, and UI polish are complete. Subtasks, entity linking, and Lovelace cards remain.

**Phase 4: Partially Complete** - Visual theming done. Settings view, import/export, and HACS packaging remain.

**Key Features Implemented:**
- ✅ Full CRUD for boards, columns, tasks
- ✅ Persistent storage with auto-save
- ✅ Real-time WebSocket updates
- ✅ Drag-and-drop with visual feedback
- ✅ Task priorities, tags, and due dates
- ✅ Import from HA todo lists (per-column and bulk)
- ✅ Multi-board support with tab navigation
- ✅ Dark/light mode compatibility

**Next Priorities:**
- Subtasks/checklists
- Entity linking and automation hooks
- Lovelace cards
- Settings view for board management
- Task filtering and search

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

- [x] Define core Python data structures in `model.py`:
  - [x] `Board`
  - [x] `Column`
  - [x] `Task`
  - [x] `ChecklistItem`
  - [x] `EntityLink`
- [x] Implement storage layer in `storage.py`:
  - [x] Use `homeassistant.helpers.storage.Store`.
  - [x] Define root storage schema with `schema_version`.
  - [x] Implement `async_load` / `async_save` and migration hooks.
- [x] Implement a central manager class (e.g., `DobeeDoManager`) in `coordinator.py`:
  - [x] Keep in-memory collections of boards and tasks.
  - [x] Provide async CRUD methods for boards, columns, and tasks.
  - [x] Handle ordering within boards/columns.
  - [x] Emit HA events on changes.

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

- [x] Implement service registration and handlers in `services.py`:

  - [x] `dobeedo.create_board`
  - [x] `dobeedo.update_board`
  - [x] `dobeedo.create_task`
  - [x] `dobeedo.update_task`
  - [x] `dobeedo.move_task`
  - [x] `dobeedo.delete_task`

  For each service:

  - [x] Define `voluptuous` schemas.
  - [x] Wire handlers to `DobeeDoManager` methods.
  - [ ] Add basic logging and error handling.

### 1.4 WebSocket API

- [x] Add a WebSocket API module in `api.py`:
  - [x] Register commands via `websocket_api.async_register_command`.
  - [x] Implement handler for:
    - [x] `dobeedo/get_boards` (now backed by `DobeeDoManager`).
- [x] Extend handlers for:
  - [ ] `dobeedo/get_board`
  - [x] `dobeedo/get_tasks`
  - [x] `dobeedo/create_task`
  - [x] `dobeedo/update_task`
  - [x] `dobeedo/move_task`
- [x] Implement a `subscribe` command:
  - [x] `dobeedo/subscribe_updates`
  - [x] Forward relevant change events or minimal payload updates to clients.

### 1.5 Tests (Backend MVP)

Under `tests/components/dobeedo/`:

- [x] Test model behavior:
  - [x] Create/update/delete boards.
  - [x] Add/move tasks between columns.
- [x] Test storage load/save and simple migration.
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
- [x] Decide output paths and format:
  - [x] Panel bundle: `custom_components/dobeedo/www/dobee-do-panel.js` built via Vite/Rollup.
  - [x] Bundle format: single-file IIFE (no top-level `export`) so Home Assistant can execute it as a classic script when loaded via `_panel_custom`.
  - [ ] Card bundle(s): `custom_components/dobeedo/www/dobee-do-cards.js`.

### 2.2 Panel Registration

- [x] Implement `panel.py` in the backend:
  - [x] Register a sidebar panel via Home Assistant’s frontend API.
  - [x] Use an appropriate icon (e.g., `mdi:view-kanban`).
  - [x] Load the panel JS via a `_panel_custom` entry pointing at the integration’s static path for `dobee-do-panel.js`.
- [x] Static asset serving:
  - [x] Register a static path (and/or rely on HACS’ `/hacsfiles` mapping) so `custom_components/dobeedo/www/dobee-do-panel.js` is reachable to the browser without manual copies into `<config>/www`.
  - [ ] Confirm final HACS layout and release process to ensure the JS bundle is always included under `custom_components/dobeedo/www` in published versions.

### 2.3 Panel Shell & Routing

- [x] Create a main panel component in `frontend/src/panel/dobee-do-panel.ts` that:
  - [x] Registers a `dobeedo-panel` custom element.
  - [x] Accepts a `hass` property.
  - [x] Renders a full panel UI with tab-style board selector.
- [x] Multi-board support with tab navigation (no routing needed for MVP).
- [x] Fetch initial data (boards + selected board's tasks) via the WebSocket API.
- [x] Real-time updates via WebSocket subscription.

### 2.4 Basic Board UI

- [x] Board view with columns:
  - [x] Display columns in order with task counts.
  - [x] Render task cards within columns (sorted by sort_index).
  - [x] Inline form to add a task to a column with title, description, due date, priority, and tags.
  - [x] Inline form to add a new column.
- [x] Task card display:
  - [x] Display title, description, priority badge, tags badges, and due date.
  - [x] Overdue indicator for tasks past their due date.
  - [x] Edit and delete buttons.
- [x] Task editing:
  - [x] Inline edit form (replaces card when editing).
  - [x] Edit title, description, due date, priority, and tags.
  - [x] Save/cancel actions wired to the API client.

### 2.5 Frontend API Client

- [x] Implement `api/dobeedo-api.ts`:
  - [x] Wrap HA’s WebSocket connection for DoBeeDo commands.
  - [x] Provide a typed method for:
    - [x] Fetching boards (`getBoards`) matching the stubbed backend API.
- [x] Extend the client as backend commands are added:
  - [x] `getTasksForBoard`
  - [x] `createTask`
  - [x] `updateTask`
  - [x] `moveTask`
  - [x] `getColumns`
  - [x] `createColumn`
- [x] Integrate the client into the panel:
  - [x] Use `DoBeeDoApiClient` inside `dobeedo-panel` to load boards on startup.
  - [x] Render the list of boards in the panel UI.
  - [x] Render columns and tasks for the selected board.
  - [x] Allow creating columns and tasks (with optional description) from the panel.
  - [x] Allow updating task title/description and moving tasks between columns.

### 2.6 Tests (Frontend MVP)

- [x] Setup Jest/Vitest config for running unit tests (Vitest is already a dependency).
- [x] Add minimal tests for:
  - [x] API client (`getBoards` happy path, `updateTask` and `moveTask` payloads).
  - [ ] `dobeedo-panel` basic rendering (once it consumes real data).
  - [ ] Future components (`board-view`, `task-card`) as they are introduced.

---

## Phase 3 – Interactions & HA Integrations

### 3.1 Drag-and-Drop

- [x] Evaluate options for drag-and-drop:
  - [x] Native HTML5 drag-and-drop API chosen.
- [x] Implement drag-and-drop movement of tasks between columns:
  - [x] Update `sort_index`/order when tasks move.
  - [x] Call `move_task` backend API on drop.
  - [x] Visual feedback: ghost preview of dragged task, pulsing drop indicator, column highlighting.
  - [x] Drag within column for reordering.
  - [x] Drag between columns for moving.
  - [ ] Keyboard-accessible fallback (e.g., "Move to…" menu) - future enhancement.

### 3.1a Import from Home Assistant Todo Lists

- [x] Backend WebSocket API:
  - [x] `dobeedo/list_todo_entities` - List all available HA todo entities.
  - [x] `dobeedo/import_from_todo` - Import items from a specific todo list into a column.
  - [x] `dobeedo/import_all_todos` - Import all todo lists as columns with their items.
- [x] Frontend UI:
  - [x] Import button on each column header for selective import.
  - [x] Import dialog with todo list selector and status filter.
  - [x] "Import All" button at board level (prominent when no columns exist).
  - [x] Success notifications with import counts.

### 3.1b Task Metadata (Priorities, Tags, Due Dates)

- [x] Backend model extensions:
  - [x] Add `priority` field (high/medium/low) to Task model.
  - [x] Add `tags` field (list of strings) to Task model.
  - [x] Add `due_date` field (ISO date string) to Task model.
  - [x] Update WebSocket API and services to accept and return these fields.
- [x] Frontend UI:
  - [x] Priority selection dropdown (create and edit forms).
  - [x] Priority badge display with color coding (red/orange/blue).
  - [x] Tags input (comma-separated) in forms.
  - [x] Tags display as purple badges on task cards.
  - [x] Due date picker (HTML5 date input) in forms.
  - [x] Due date display with relative formatting (Today/Tomorrow/date).
  - [x] Overdue indicator (red styling) for tasks past due date.

### 3.1c UI Polish & Theming

- [x] Dark/light mode compatibility:
  - [x] Use Home Assistant CSS variables throughout.
  - [x] Dynamic theming for all components.
- [x] Board selector:
  - [x] Tab-style board navigation with hover effects.
  - [x] Delete board buttons (with confirmation).
  - [x] Inline board creation form.
- [x] Visual feedback improvements:
  - [x] Hover effects on all interactive elements.
  - [x] Transition animations for state changes.
  - [x] Box shadows and elevation for depth.
  - [x] Consistent spacing and alignment.

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

- [ ] Handle large boards gracefully (basic pagination or "load more").
- [ ] Improve keyboard navigation and ARIA attributes for accessibility.
- [x] Refine visual design to match HA themes (light/dark).
- [ ] Add task filtering (by tag, priority, due date).
- [ ] Add task search functionality.
- [ ] Add task archiving/completion workflow.

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
   - **Current status:** The Vite build writes `dobee-do-panel.js` into `custom_components/dobeedo/www/` as an IIFE bundle. The backend registers the panel and exposes this directory via a static path (and `/hacsfiles` when installed through HACS), so the browser can load the bundle directly without any manual copy into `<config>/www`.

---

This plan is intentionally implementation-oriented. As we build out the codebase, we should keep this document in sync by marking tasks as done, noting stubs, and adding new items when we introduce new modules or behavior.
