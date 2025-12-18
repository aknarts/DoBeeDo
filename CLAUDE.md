# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DoBeeDo is a Home Assistant custom integration that provides a kanban-style task board directly in the Home Assistant UI. The project consists of:

- **Backend**: Python custom component (`custom_components/dobeedo/`)
- **Frontend**: TypeScript/Lit web components (`frontend/`)

The integration exposes:
- Home Assistant services for CRUD operations on boards and tasks
- WebSocket API for the frontend panel
- Events on the HA event bus when boards/tasks change
- A sidebar panel registration for the DoBeeDo UI

## Common Commands

### Backend (Python)

**Run tests:**
```bash
./scripts/test_in_pyenv.sh
```

**Run tests with pytest directly (if dependencies installed):**
```bash
pytest tests/
```

**Run single test file:**
```bash
pytest tests/components/dobeedo/test_manager_crud.py
```

**Setup Python test environment (first time):**
```bash
./scripts/setup_pyenv.sh
```

**Check code style with ruff:**
```bash
ruff check custom_components/ tests/
```

**Format with ruff:**
```bash
ruff format custom_components/ tests/
```

### Frontend (TypeScript)

**Build the frontend bundle:**
```bash
cd frontend
npm install
npm run build
```

This outputs `dobee-do-panel.js` to `custom_components/dobeedo/www/`.

**Run frontend tests:**
```bash
cd frontend
npm test
```

**Development mode (watch):**
```bash
cd frontend
npm run dev
```

### Home Assistant Integration

**Deploy to Home Assistant:**
After building the frontend, copy the bundle to HA's www directory:
```bash
mkdir -p /config/www/dobeedo
cp custom_components/dobeedo/www/dobee-do-panel.js /config/www/dobeedo/
```

Then restart Home Assistant and add the DoBeeDo integration via UI.

## Architecture

### Backend Structure

**Key files:**
- `__init__.py`: Integration setup, registers panel/services/API
- `coordinator.py`: `DobeeDoManager` class - central state manager for boards/columns/tasks
- `model.py`: Data classes (`Board`, `Column`, `Task`, `ChecklistItem`, `EntityLink`)
- `api.py`: WebSocket API commands for frontend communication
- `services.py`: Home Assistant service definitions
- `storage.py`: Persistence layer using HA's storage helper
- `panel.py`: Panel registration logic
- `const.py`: Constants, event names, domain name

**Data flow:**
1. Frontend calls WebSocket API commands (e.g., `dobeedo/create_task`)
2. API handlers in `api.py` call methods on `DobeeDoManager`
3. Manager updates in-memory state and fires HA events
4. Storage layer persists changes
5. Events propagate back to subscribed WebSocket connections

**State management:**
- `DobeeDoManager` holds all boards, columns, and tasks in memory (dicts by ID)
- Uses monotonic ID counters for simple, readable IDs (e.g., "board-1", "task-42")
- All mutations go through manager methods (async)
- Manager fires events on all changes: `EVENT_BOARD_CREATED`, `EVENT_TASK_UPDATED`, etc.

### Frontend Structure

**Key files:**
- `src/panel/dobee-do-panel.ts`: Main panel component (`DoBeeDoPanel`)
- `src/api/dobeedo-api.ts`: API client wrapper (`DoBeeDoApiClient`)
- `vite.config.ts`: Build configuration (outputs IIFE bundle)

**Data flow:**
1. Panel component uses `DoBeeDoApiClient` to call WebSocket commands
2. Client wraps `hass.connection.sendMessagePromise()` calls
3. Panel subscribes to updates via `subscribeUpdates()` for real-time sync
4. Local state (`_boards`, `_tasks`, `_columns`) updates on responses/events

**Component architecture:**
- Single `DoBeeDoPanel` Lit component (for now)
- Stores boards/columns/tasks in `@state()` properties
- Subscribes to backend events on mount, unsubscribes on disconnect
- Renders board selector, column view, task list, and creation forms

### WebSocket API

All commands follow the pattern:
```typescript
{
  type: "dobeedo/command_name",
  ...params
}
```

**Available commands:**
- `dobeedo/get_boards` → `{boards: Board[]}`
- `dobeedo/get_columns` (board_id) → `{columns: Column[]}`
- `dobeedo/get_tasks` (board_id) → `{tasks: Task[]}`
- `dobeedo/create_task` (board_id, column_id, title, description?, sort_index?) → `{task: Task}`
- `dobeedo/update_task` (task_id, title?, description?) → `{task: Task}`
- `dobeedo/move_task` (task_id, target_column_id, target_sort_index?) → `{task: Task}`
- `dobeedo/create_column` (board_id, name, order_index?) → `{column: Column}`
- `dobeedo/subscribe_updates` → streams `{type: "dobeedo/event", event_type: string, payload: any}`

### Events

The backend fires these events on the HA event bus:
- `dobeedo_board_created`, `dobeedo_board_updated`, `dobeedo_board_deleted`
- `dobeedo_column_created`
- `dobeedo_task_created`, `dobeedo_task_updated`, `dobeedo_task_deleted`, `dobeedo_task_moved`

Frontend subscribes via `dobeedo/subscribe_updates` WebSocket command.

## Important Patterns

### Backend Conventions

**Async everywhere:**
All manager methods are async. Use `async def` and `await` for operations.

**Error handling:**
- Manager methods raise `KeyError` for missing IDs
- API/service layers catch and convert to user-friendly errors

**Voluptuous schemas:**
Service definitions use voluptuous for validation (see `services.py`).

**Event emission:**
Always fire events after state changes:
```python
self._fire_event(EVENT_TASK_CREATED, {"task": task.to_dict()})
```

### Frontend Conventions

**Type safety:**
Strong typing for API payloads. See `DoBeeDoTaskSummary`, `DoBeeDoBoardSummary` in `dobeedo-api.ts`.

**Home Assistant integration:**
Access WebSocket via `this.hass.connection`. Never create a new connection.

**State updates:**
Use Lit's `@state()` decorator. Trigger re-renders by reassigning arrays:
```typescript
this._tasks = [...this._tasks, newTask];
```

**Event subscription:**
Subscribe in `updated()` lifecycle, unsubscribe in `disconnectedCallback()`.

**Touch drag-and-drop:**
For custom touch interactions that conflict with browser scrolling:
- Use `touch-action: none` CSS on draggable elements to prevent browser scroll gestures
- Add touch event listeners with `{ passive: false }` to enable `preventDefault()`
- Use `shadowRoot.elementsFromPoint()` for hit testing in web components
- Temporarily hide dragging element during hit tests to see through it
- Clean up global touch listeners in `disconnectedCallback()` and touch end handler

## Testing

### Backend Tests

Tests use pytest and are located in `tests/components/dobeedo/`.

**Key test patterns:**
- Use `@pytest.fixture` for HA instance and manager setup
- Mock WebSocket connections for API tests
- Test storage separately from manager logic

**Running specific tests:**
```bash
pytest tests/components/dobeedo/test_manager_crud.py::test_create_board
```

### Frontend Tests

Tests use vitest and are located alongside source files (e.g., `dobeedo-api.test.ts`).

**Test patterns:**
- Mock `hass.connection.sendMessagePromise()`
- Test API client methods independently
- Component tests will use Lit testing utilities when added

## Current State & Roadmap

The project is in MVP stage with core features complete:
- ✅ Backend CRUD for boards, columns, tasks
- ✅ WebSocket API with real-time events
- ✅ Persistent storage (fully integrated with auto-save)
- ✅ Frontend panel with task creation/editing/moving/deleting
- ✅ Multi-board support with tab-style board selector
- ✅ Drag-and-drop task management (desktop and mobile/touch with visual feedback)
- ✅ Task priorities (high/medium/low with color-coded badges)
- ✅ Task tags (comma-separated, displayed as badges)
- ✅ Due dates (with overdue indicators and relative display)
- ✅ Import from Home Assistant todo entities (per-column and bulk import)
- ✅ Dark/light mode compatibility (uses HA theme variables)
- ⏳ Subtasks/checklists (model defined, not yet wired)
- ⏳ Entity linking and auto-completion (model defined, not yet wired)
- ⏳ Lovelace cards (planned)
- ⏳ Task filtering and search (planned)
- ⏳ Task archiving (planned)

See `README.md` for detailed milestones and `docs/DEVELOPMENT_PLAN.md` for technical planning.

## Important Notes for AI Assistants

**Home Assistant conventions:**
- Use HA's storage helper for persistence (`homeassistant.helpers.storage.Store`)
- Follow HA's async patterns (never block the event loop)
- Use HA's logger (`logging.getLogger(__name__)`)
- Keep integration state in a coordinator/manager object

**Code organization:**
- Keep models lightweight (dataclasses with to_dict/from_dict)
- Manager handles all business logic and event firing
- API layer is thin (just validation and manager calls)
- Frontend client wraps WebSocket calls and provides typed interface

**Breaking changes:**
Be cautious when changing WebSocket message formats or service schemas. These are the public API.

**Dependencies:**
Avoid adding backend dependencies (HA provides most utilities). Frontend should stay lightweight (Lit + minimal tooling).

**Documentation:**
Update README.md or docs/ when adding features or changing behavior. Keep this CLAUDE.md in sync with architecture changes.
