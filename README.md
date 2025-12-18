# DoBeeDo – Home Assistant Task Board Integration

DoBeeDo is a Home Assistant custom integration plus frontend panel that adds a kanban-style task board directly into your smart home. It’s designed for household and personal task management that feels at home in Home Assistant.

## Overview

DoBeeDo gives you:

- A full-page panel in Home Assistant’s left sidebar showing boards, columns, and tasks.
- Configurable columns (e.g., Backlog → Doing → Done) with drag-and-drop between them.
- Rich task details, subtasks, and comments.
- Assignment of tasks to Home Assistant users or free-form names.
- Optional linking of tasks to entities, scripts, and automations so you can trigger actions or auto-complete tasks from state changes.
- Optional Lovelace cards to surface key tasks and board snapshots on your dashboards.

The integration is built as a custom component (Python) with a TypeScript-based frontend using Home Assistant’s web component conventions.

> Note: This project is early-stage. Expect breaking changes before v1.0.

---

## Goals

- **Simple household and personal task boards** that live inside Home Assistant.
- **Configurable columns and states** (e.g., todo, doing, done) for each board.
- **Drag & drop** to reorder and move tasks between columns.
- **Subtasks / checklists** to break down larger tasks.
- **Assignments** to one or more Home Assistant users or free-form labels.
- **Entity and automation integration** to:
  - Link tasks to entities (lights, sensors, devices…).
  - Trigger scripts/automations from a task.
  - Optionally auto-complete tasks based on entity state.
- **Lovelace integration** via custom cards:
  - A board snapshot card.
  - A “my tasks” card filtered by user or tag.

### Non-goals (for the initial versions)

- Full-blown project management (sprints, burndown charts, complex workflows).
- External sync with other task systems in early versions.
- Custom authentication or permissions beyond what Home Assistant already provides.

---

## High-Level Architecture

### Backend (Home Assistant custom component)

- Domain: `dobeedo`.
- Lives under `custom_components/dobeedo/`.
- Uses Home Assistant’s storage helper to persist boards and tasks in `.storage`.
- Exposes:
  - Home Assistant **services** for creating and updating boards and tasks.
  - A **WebSocket API** for the frontend panel and Lovelace cards.
  - **Events** on the Home Assistant event bus when boards or tasks change.
  - A **panel registration** that adds the DoBeeDo entry to the left sidebar.

### Frontend (panel and cards)

- Implemented as web components in TypeScript, following HA’s UI patterns.
- Bundled and served by the integration as static JS assets.
- Provides:
  - A main **DoBeeDo panel** reachable from the HA sidebar.
  - A **board view** with columns and draggable task cards.
  - A **task details** dialog with subtasks/checklist, comments, and entity links.
  - A **settings view** for managing boards and columns.
  - Custom **Lovelace cards** (board snapshot and “my tasks”).

---

## Core Concepts

### Boards and Columns

- Multiple boards are supported (e.g., "Household", "Garden", "Maintenance").
- Each board has a configurable set of columns ("Todo", "Doing", "Done" by default).
- Columns can be reordered and optionally configured with:
  - A WIP limit (soft limit only; visual warning).
  - A color or accent.

### Tasks

Each task can include:

- A short **title** (required).
- A longer **description** (markdown-friendly).
- **Column / status** – which column it currently lives in.
- **Subtasks / checklist** items.
- **Comments / notes** (simple linear comment list in early versions).
- Optional **due date** and **priority**.
- **Tags/labels** for flexible grouping.
- **Assignees** (list of HA users or free text).
- **Linked entities** (entities, scripts, automations) and an optional
  *auto-complete* condition, such as “mark done when `binary_sensor.trash_out` is `off`”.

Tasks are ordered within a column; you can drag them to reorder.

---

## Installation & Configuration

### As a custom integration (HACS-style)

Until this project is published as an official HACS repository, you can install it as a custom integration with a similar layout:

1. **Clone this repository** into your Home Assistant configuration directory under `custom_components`:

   ```bash
   cd /config/custom_components
   git clone https://github.com/aknarts/DoBeeDo dobeedo
   ```

2. **Build the frontend bundle** (from the project root):

   ```bash
   cd frontend
   npm install
   npm run build
   ```

   This will output `dobee-do-panel.js` into `custom_components/dobeedo/www/`.

3. **Make the bundle available under `/local` for the panel** by copying it into Home Assistant's `www` directory:

   ```bash
   cd /config
   mkdir -p www/dobeedo
   cp custom_components/dobeedo/www/dobee-do-panel.js www/dobeedo/
   ```

   Home Assistant will then serve the panel bundle at `/local/dobeedo/dobee-do-panel.js`, which matches the panel registration.

4. **Restart Home Assistant.**

5. In Home Assistant, go to **Settings → Devices & Services → Add Integration** and search for **DoBeeDo**.

   - Add the integration (there are currently no options).
   - Once added, a **DoBeeDo** entry should appear in the left sidebar. Clicking it should load the DoBeeDo panel from the bundle you just built.

As the integration matures and HACS metadata (`hacs.json`) is added, the build and deployment story can be streamlined so the bundle is always shipped in a place HACS/HA serve automatically.

### Configuration options

Right now there are no user-facing options in the config flow. Installing the integration simply enables the backend and registers the sidebar panel. Boards, columns, and tasks will be configured from within the panel UI once implemented.

---

## Planned Features & Milestones

This is a rough roadmap. Actual releases may group items differently.

### Milestone 1 – Backend MVP

- Basic custom component skeleton under `custom_components/dobeedo/`.
- In-memory model + persisted storage for:
  - Boards
  - Columns
  - Tasks
- HA services:
  - `dobeedo.create_board`
  - `dobeedo.update_board`
  - `dobeedo.create_task`
  - `dobeedo.update_task`
  - `dobeedo.move_task`
  - `dobeedo.delete_task`
- WebSocket API for fetching boards and tasks and basic mutations.
- Events fired on task/board changes.

### Milestone 2 – Panel MVP

- Register a sidebar panel named **DoBeeDo**.
- Panel screens:
  - Board list / selector.
  - Single board view with columns and tasks.
  - Simple task details dialog.
- CRUD operations wired to the backend via WebSocket.
- Basic tests and developer docs.

### Milestone 3 – Interactions & Integrations

- Drag-and-drop for tasks between columns.
- Linking of tasks to entities, scripts, and automations.
- Optional auto-completion of tasks when an entity reaches a target state.
- “Board snapshot” and “My tasks” Lovelace cards.

### Milestone 4 – Polish & Release

- Settings view for managing boards, columns, and defaults.
- Import/export of workspace or boards.
- Visual polish, accessibility, and keyboard navigation.
- HACS-ready packaging and documentation.

Future ideas (post-1.0) include recurring tasks, calendar views, and light integration with external task systems.

---

## Development & Testing

### Populating Test Data

For development and testing purposes, you can quickly populate your DoBeeDo instance with sample data. This is useful for testing features or demonstrating the integration.

**WARNING**: This service CLEARS ALL existing boards, columns, and tasks before creating sample data.

#### Using Developer Tools (UI):

1. Go to **Developer Tools → Services** in Home Assistant
2. Search for and select **dobeedo.populate_test_data**
3. Click **Call Service**

#### Using the CLI:

```bash
ha service call dobeedo.populate_test_data
```

This will create:
- A sample board called "Sample Project"
- Five columns (Backlog, To Do, In Progress, Review, Done)
- Multiple tasks distributed across the columns with descriptions

---

## Development Plan (Short Version)

Detailed technical planning lives in `docs/DEVELOPMENT_PLAN.md`. At a high level:

1. **Scaffold the backend integration**
   - Create `custom_components/dobeedo/` with `manifest.json`, `__init__.py`, `const.py`.
   - Implement a simple in-memory model and storage using `homeassistant.helpers.storage.Store`.
   - Add core services and WebSocket API endpoints.

2. **Add a basic frontend panel**
   - Set up a TypeScript build (Lit components recommended).
   - Implement the DoBeeDo panel shell and a basic board view.
   - Wire the frontend to the backend via WebSocket.

3. **Enhance UX & integrations**
   - Add drag-and-drop, subtasks, and comments.
   - Add entity linking and quick actions.
   - Add Lovelace cards and example automations.

4. **Polish and prepare for release**
   - Improve performance, handle edge cases, and write tests.
   - Add documentation, screenshots, and HACS metadata.

---

## Getting Started (Development)

> NOTE: These steps describe the intended workflow; actual commands and files will be added or refined as the project is implemented.

1. **Clone this repository** and place it under your Home Assistant `config/custom_components` folder (or mount it via devcontainer).
2. **Start Home Assistant** in dev mode (devcontainer or local install).
3. **Build the frontend** as described in the installation section so the panel bundle is available.
4. **Enable the integration** from Settings → Devices & Services.
5. Use Developer Tools → Services to call `dobeedo.*` services as they are implemented.

---

## Development: Python test environment

This repository includes helper scripts to create and use an isolated
Python environment for running tests without installing Home Assistant
and other dependencies into your system Python.

From the project root:

```bash
# One-time setup: create a local pyenv + virtualenv and install deps
./scripts/setup_pyenv.sh

# Run tests inside that environment
./scripts/test_in_pyenv.sh
```

The setup script:

- Bootstraps a local `pyenv` under `.pyenv` (if `pyenv` is not already
  available on your PATH).
- Installs a dedicated Python version for tests (currently `3.13.0`).
- Creates a virtualenv at `.venv-test` and installs:
  - `homeassistant` (so the integration and tests can import it).
  - `pytest` and any test extras from `pyproject.toml`.

The `test_in_pyenv.sh` wrapper activates `.venv-test` and then runs
`pytest`, forwarding any extra arguments you pass through to pytest.

This keeps your system Python clean while giving you a realistic test
environment that includes the real Home Assistant package.

---

## Contributing

This project is in its early stages. Contributions are welcome once the basic scaffolding is in place. Planned contribution areas include:

- Backend logic and tests.
- Frontend components and UX polish.
- Documentation, examples, and translations.

Issues and pull requests will be triaged according to the milestones outlined above.

---

## License

This project is licensed under the terms described in `LICENSE` in this repository.
