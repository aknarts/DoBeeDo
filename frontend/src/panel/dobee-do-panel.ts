import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { DoBeeDoBoardSummary, DoBeeDoTaskSummary, DoBeeDoEventMessage, DoBeeDoColumnSummary } from "../api/dobeedo-api";
import { DoBeeDoApiClient, type HassConnection } from "../api/dobeedo-api";

// Minimal type for the Home Assistant hass object; this will be expanded later.
export interface HomeAssistant {
  language: string;
  connection: HassConnection;
}

@customElement("dobeedo-panel")
export class DoBeeDoPanel extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _boards: DoBeeDoBoardSummary[] = [];

  @state()
  private _tasks: DoBeeDoTaskSummary[] = [];

  @state()
  private _columns: DoBeeDoColumnSummary[] = [];

  @state()
  private _loading = false;

  @state()
  private _newTaskTitle = "";

  @state()
  private _newTaskDescription = "";

  @state()
  private _newColumnName = "";

  @state()
  private _unsubscribeUpdates: (() => void) | null = null;

  @state()
  private _selectedBoardId: string | null = null;

  @state()
  private _selectedColumnId: string | null = null;

  @state()
  private _editingTaskId: string | null = null;

  @state()
  private _editTaskTitle: string = "";

  @state()
  private _editTaskDescription: string = "";

  @state()
  private _movingTaskId: string | null = null;

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
        padding: 24px;
        background: var(--primary-background-color);
        min-height: 100vh;
        color: var(--primary-text-color);
      }

      h1 {
        margin: 0 0 24px 0;
        font-size: 2em;
        font-weight: 300;
        color: var(--primary-text-color);
      }

      /* Buttons */
      button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        font-family: inherit;
      }

      button:hover:not(:disabled) {
        filter: brightness(1.1);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      button.primary {
        background-color: var(--primary-color);
        color: var(--text-primary-color);
      }

      button.secondary {
        background-color: var(--card-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
      }

      button.warning {
        background-color: var(--warning-color);
        color: var(--text-primary-color);
      }

      button.small {
        padding: 4px 8px;
        font-size: 12px;
      }

      /* Input fields */
      input, select {
        padding: 8px 12px;
        border: 1px solid var(--input-idle-line-color, var(--divider-color));
        border-radius: 4px;
        background: var(--input-fill-color, var(--secondary-background-color));
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
        transition: border-color 0.2s ease;
      }

      input:focus, select:focus {
        outline: none;
        border-color: var(--input-hover-line-color, var(--primary-color));
      }

      /* Board selector */
      .board-selector {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }

      .board-chip {
        padding: 8px 16px;
        border-radius: 16px;
        background: var(--card-background-color, #1c1c1c);
        border: 1px solid var(--ha-color-border-neutral-normal, #7a7a7a);
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--primary-text-color);
      }

      .board-chip:hover {
        border-color: var(--primary-color);
        transform: translateY(-1px);
        box-shadow: var(--material-shadow-elevation-2dp, 0 2px 2px 0 rgba(0,0,0,0.14));
      }

      .board-chip.selected {
        background: var(--primary-color);
        color: var(--text-primary-color);
        border-color: var(--primary-color);
        box-shadow: var(--material-shadow-elevation-2dp, 0 2px 2px 0 rgba(0,0,0,0.14));
      }

      /* Columns layout */
      .columns-container {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        padding-bottom: 16px;
      }

      .column {
        flex: 0 0 300px;
        background: var(--card-background-color, #1c1c1c);
        border: 1px solid var(--ha-color-border-neutral-quiet, #5e5e5e);
        border-radius: var(--ha-border-radius-md, 8px);
        padding: 16px;
        box-shadow: var(--material-shadow-elevation-2dp, 0 2px 2px 0 rgba(0,0,0,0.14));
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 300px);
      }

      .column-header {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .column-header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .task-count {
        font-size: 12px;
        font-weight: 400;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color, var(--divider-color));
        padding: 2px 8px;
        border-radius: 12px;
      }

      .tasks-list {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-height: 100px;
      }

      /* Task cards */
      .task-card {
        background: var(--secondary-background-color, #282828);
        border: 1px solid var(--ha-color-border-neutral-normal, #7a7a7a);
        border-left: 3px solid var(--ha-color-border-neutral-loud, #b1b1b1);
        border-radius: 6px;
        padding: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: var(--material-shadow-elevation-2dp, 0 2px 2px 0 rgba(0,0,0,0.14));
      }

      .task-card:hover {
        border-left-color: var(--primary-color);
        box-shadow: var(--material-shadow-elevation-4dp, 0 4px 5px 0 rgba(0,0,0,0.14));
        transform: translateY(-2px);
      }

      .task-title {
        font-weight: 500;
        margin-bottom: 4px;
        color: var(--primary-text-color);
      }

      .task-description {
        font-size: 13px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
        line-height: 1.4;
      }

      .task-actions {
        display: flex;
        gap: 4px;
        margin-top: 8px;
      }

      /* Forms */
      .form-section {
        background: var(--card-background-color);
        border-radius: var(--ha-card-border-radius, 8px);
        padding: 16px;
        margin-bottom: 16px;
        box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0,0,0,0.1));
      }

      .form-row {
        display: flex;
        gap: 8px;
        align-items: flex-end;
        flex-wrap: wrap;
        margin-top: 12px;
      }

      .form-row > * {
        flex: 1;
        min-width: 150px;
      }

      .form-label {
        display: block;
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .helper-text {
        font-size: 13px;
        color: var(--secondary-text-color);
        margin-left: 8px;
      }

      .empty-state {
        text-align: center;
        padding: 32px;
        color: var(--secondary-text-color);
      }

      /* Utility classes */
      .mb-16 {
        margin-bottom: 16px;
      }

      .flex-row {
        display: flex;
        gap: 8px;
        align-items: center;
      }
    `;
  }

  protected updated(changedProps: Map<string | number | symbol, unknown>): void {
    if (changedProps.has("hass") && this.hass) {
      void this._fetchBoards();

      if (!this._unsubscribeUpdates) {
        const api = new DoBeeDoApiClient(this.hass.connection);
        // eslint-disable-next-line no-console
        console.debug("DoBeeDo: registering subscribeUpdates");
        this._unsubscribeUpdates = api.subscribeUpdates((evt: DoBeeDoEventMessage) => {
          // eslint-disable-next-line no-console
          console.debug("DoBeeDo event received in panel", evt);

          if (evt.event_type.startsWith("task_")) {
            const boardId = (evt.payload as any).task?.board_id;
            // eslint-disable-next-line no-console
            console.debug("DoBeeDo task event for board", boardId, "selected", this._selectedBoardId);
            if (boardId && boardId === this._selectedBoardId) {
              void this._refreshTasksForSelectedBoard();
            }
          } else if (evt.event_type.startsWith("column_")) {
            const boardId = (evt.payload as any).column?.board_id;
            // eslint-disable-next-line no-console
            console.debug("DoBeeDo column event for board", boardId, "selected", this._selectedBoardId);
            if (boardId && boardId === this._selectedBoardId) {
              void this._refreshColumnsAndTasks();
            }
          } else if (evt.event_type.startsWith("board_")) {
            // eslint-disable-next-line no-console
            console.debug("DoBeeDo board event");
            void this._fetchBoards();
          }
        });
      }
    }
  }

  private async _fetchBoards(): Promise<void> {
    if (!this.hass) {
      return;
    }

    this._loading = true;
    try {
      const api = new DoBeeDoApiClient(this.hass.connection);
      this._boards = await api.getBoards();

      if (!this._selectedBoardId && this._boards.length > 0) {
        this._selectedBoardId = this._boards[0].id;
      }

      await this._refreshColumnsAndTasks();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to load DoBeeDo data", err);
    } finally {
      this._loading = false;
    }
  }

  private async _refreshColumnsAndTasks(): Promise<void> {
    if (!this.hass || !this._selectedBoardId) {
      this._columns = [];
      this._tasks = [];
      this._selectedColumnId = null;
      return;
    }
    const api = new DoBeeDoApiClient(this.hass.connection);
    this._columns = await api.getColumns(this._selectedBoardId);
    this._tasks = await api.getTasks(this._selectedBoardId);

    // Ensure selected column stays valid.
    if (this._columns.length === 0) {
      this._selectedColumnId = null;
    } else if (!this._selectedColumnId || !this._columns.some((c) => c.id === this._selectedColumnId)) {
      this._selectedColumnId = this._columns[0].id;
    }
  }

  private async _refreshTasksForSelectedBoard(): Promise<void> {
    if (!this.hass || !this._selectedBoardId) {
      this._tasks = [];
      return;
    }
    const api = new DoBeeDoApiClient(this.hass.connection);
    this._tasks = await api.getTasks(this._selectedBoardId);
  }

  private _handleSelectBoard(board: DoBeeDoBoardSummary): void {
    if (this._selectedBoardId === board.id) {
      return;
    }
    this._selectedBoardId = board.id;
    void this._refreshColumnsAndTasks();
  }

  private async _handleCreateTask(): Promise<void> {
    if (!this.hass || !this._selectedBoardId || !this._newTaskTitle.trim()) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    const board = this._boards.find((b) => b.id === this._selectedBoardId);
    if (!board) {
      return;
    }

    const columnId = this._selectedColumnId;
    if (!columnId) {
      // eslint-disable-next-line no-console
      console.warn("No column selected on the selected board to create a task in.");
      return;
    }

    try {
      const newTask = await api.createTask(
        board.id,
        columnId,
        this._newTaskTitle.trim(),
        this._newTaskDescription.trim() || undefined,
      );
      this._newTaskTitle = "";
      this._newTaskDescription = "";

      if (board.id === this._selectedBoardId) {
        this._tasks = [...this._tasks, newTask];
      } else {
        await this._refreshTasksForSelectedBoard();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to create DoBeeDo task", err);
    }
  }

  private async _handleCreateColumn(): Promise<void> {
    if (!this.hass || !this._selectedBoardId || !this._newColumnName.trim()) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      const newColumn = await api.createColumn(this._selectedBoardId, this._newColumnName.trim());
      this._newColumnName = "";

      // Append the new column locally so the UI updates immediately.
      this._columns = [...this._columns, newColumn];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to create DoBeeDo column", err);
    }
  }

  private _startEditTask(task: DoBeeDoTaskSummary): void {
    this._editingTaskId = task.id;
    this._editTaskTitle = task.title;
    this._editTaskDescription = task.description ?? "";
  }

  private _cancelEditTask(): void {
    this._editingTaskId = null;
    this._editTaskTitle = "";
    this._editTaskDescription = "";
  }

  private async _saveEditTask(): Promise<void> {
    if (!this.hass || !this._editingTaskId) {
      return;
    }

    const task = this._tasks.find((t) => t.id === this._editingTaskId);
    if (!task) {
      return;
    }

    const trimmedTitle = this._editTaskTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    const updates: { title?: string; description?: string | null } = {};

    if (trimmedTitle !== task.title) {
      updates.title = trimmedTitle;
    }

    const trimmedDescription = this._editTaskDescription.trim();
    if (trimmedDescription !== (task.description ?? "")) {
      updates.description = trimmedDescription === "" ? null : trimmedDescription;
    }

    if (!updates.title && updates.description === undefined) {
      this._cancelEditTask();
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      const updated = await api.updateTask(this._editingTaskId, updates);
      this._tasks = this._tasks.map((t) => (t.id === updated.id ? updated : t));
      this._cancelEditTask();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to update DoBeeDo task", err);
    }
  }

  private _startMoveTask(task: DoBeeDoTaskSummary): void {
    this._movingTaskId = task.id;
  }

  private _cancelMoveTask(): void {
    this._movingTaskId = null;
  }

  private async _handleMoveTask(task: DoBeeDoTaskSummary, targetColumnId: string): Promise<void> {
    if (!this.hass || targetColumnId === task.column_id) {
      this._cancelMoveTask();
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      const moved = await api.moveTask(task.id, targetColumnId);
      this._tasks = this._tasks.map((t) => (t.id === moved.id ? moved : t));
      this._cancelMoveTask();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to move DoBeeDo task", err);
    }
  }

  private async _handleDeleteTask(task: DoBeeDoTaskSummary): Promise<void> {
    if (!this.hass) {
      return;
    }

    if (!window.confirm(`Delete task "${task.title}"?`)) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      await api.deleteTask(task.id);
      this._tasks = this._tasks.filter((t) => t.id !== task.id);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to delete DoBeeDo task", err);
    }
  }

  private async _handleDeleteColumn(column: DoBeeDoColumnSummary): Promise<void> {
    if (!this.hass) {
      return;
    }

    const tasksInColumn = this._tasks.filter((t) => t.column_id === column.id);
    const taskCount = tasksInColumn.length;

    const message =
      taskCount > 0
        ? `Delete column "${column.name}" and ${taskCount} task${taskCount === 1 ? "" : "s"}?`
        : `Delete column "${column.name}"?`;

    if (!window.confirm(message)) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      await api.deleteColumn(column.id);
      this._columns = this._columns.filter((c) => c.id !== column.id);
      this._tasks = this._tasks.filter((t) => t.column_id !== column.id);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to delete DoBeeDo column", err);
    }
  }

  // TODO: REMOVE BEFORE RELEASE - Development helper only!
  private async _handlePopulateTestData(): Promise<void> {
    if (!this.hass) {
      return;
    }

    // Always confirm since this is destructive
    if (
      !window.confirm(
        "⚠️ WARNING: This will DELETE ALL existing boards, columns, and tasks!\n\n" +
          "This is a development helper that clears everything and creates fresh test data.\n\n" +
          "Are you sure you want to continue?",
      )
    ) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      await api.populateTestData();
      await this._fetchBoards();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to populate test data", err);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._unsubscribeUpdates) {
      this._unsubscribeUpdates();
      this._unsubscribeUpdates = null;
    }
  }

  protected render(): TemplateResult {
    // TODO: REMOVE BEFORE RELEASE - The test data button is dev-only
    return html`
      <h1>DoBeeDo</h1>

      <div class="flex-row mb-16">
        <button class="warning" @click=${() => this._handlePopulateTestData()} ?disabled=${this._loading}>
          ⚠️ Populate Test Data (DEV ONLY)
        </button>
        <span class="helper-text">
          (Development helper - CLEARS ALL DATA and adds sample board. Remove before release!)
        </span>
      </div>

      ${this._loading ? html`<p>Loading boards…</p>` : this._renderContent()}
    `;
  }

  private _renderContent(): TemplateResult {
    if (this._boards.length === 0) {
      return html`
        <div class="empty-state">
          <p>No boards available yet.</p>
          <p>Click "Populate Test Data" to get started!</p>
        </div>
      `;
    }

    return html`
      ${this._renderBoardSelector()}
      ${this._selectedBoardId ? this._renderBoard() : html`<p>Select a board to begin</p>`}
    `;
  }

  private _renderBoardSelector(): TemplateResult {
    return html`
      <div class="board-selector">
        ${this._boards.map(
          (board) => html`
            <div
              class="board-chip ${board.id === this._selectedBoardId ? "selected" : ""}"
              @click=${() => this._handleSelectBoard(board)}
            >
              ${board.name}
            </div>
          `,
        )}
      </div>
    `;
  }

  private _renderBoard(): TemplateResult {
    return html`
      <div class="form-section">
        <label class="form-label">Add Column</label>
        <div class="form-row">
          <div>
            <input
              type="text"
              .value=${this._newColumnName}
              placeholder="Column name (e.g., To Do, In Progress, Done)"
              @input=${(ev: Event) => {
                const target = ev.target as HTMLInputElement;
                this._newColumnName = target.value;
              }}
              @keydown=${(ev: KeyboardEvent) => {
                if (ev.key === "Enter") {
                  void this._handleCreateColumn();
                }
              }}
            />
          </div>
          <button
            class="primary"
            @click=${() => this._handleCreateColumn()}
            ?disabled=${!this._newColumnName.trim() || !this._selectedBoardId}
          >
            Add Column
          </button>
        </div>
      </div>

      ${this._columns.length === 0
        ? html`<div class="empty-state">No columns yet. Add a column to get started!</div>`
        : html`
            <div class="columns-container">${this._columns.map((col) => this._renderColumn(col))}</div>

            <div class="form-section">
              <label class="form-label">Create New Task</label>
              <div class="form-row">
                <div style="flex: 2;">
                  <input
                    type="text"
                    .value=${this._newTaskTitle}
                    placeholder="Task title"
                    @input=${(ev: Event) => {
                      const target = ev.target as HTMLInputElement;
                      this._newTaskTitle = target.value;
                    }}
                    @keydown=${(ev: KeyboardEvent) => {
                      if (ev.key === "Enter") {
                        void this._handleCreateTask();
                      }
                    }}
                  />
                </div>
                <div style="flex: 2;">
                  <input
                    type="text"
                    .value=${this._newTaskDescription}
                    placeholder="Description (optional)"
                    @input=${(ev: Event) => {
                      const target = ev.target as HTMLInputElement;
                      this._newTaskDescription = target.value;
                    }}
                  />
                </div>
                <div style="flex: 1;">
                  <select
                    .value=${this._selectedColumnId ?? ""}
                    @change=${(ev: Event) => {
                      const target = ev.target as HTMLSelectElement;
                      this._selectedColumnId = target.value || null;
                    }}
                  >
                    ${this._columns.map((col) => html`<option value=${col.id}>${col.name}</option>`)}
                  </select>
                </div>
                <button
                  class="primary"
                  @click=${() => this._handleCreateTask()}
                  ?disabled=${!this._newTaskTitle.trim() ||
                  this._loading ||
                  !this._selectedBoardId ||
                  !this._selectedColumnId}
                >
                  Add Task
                </button>
              </div>
            </div>
          `}
    `;
  }

  private _renderColumn(column: DoBeeDoColumnSummary): TemplateResult {
    const tasksForColumn = this._tasks
      .filter((task) => task.column_id === column.id)
      .sort((a, b) => a.sort_index - b.sort_index);

    return html`
      <div class="column">
        <div class="column-header">
          <div class="column-header-left">
            <span>${column.name}</span>
            <span class="task-count">${tasksForColumn.length}</span>
          </div>
          <button
            class="warning small"
            @click=${() => this._handleDeleteColumn(column)}
            title="Delete column"
          >
            ×
          </button>
        </div>
        <div class="tasks-list">
          ${tasksForColumn.length === 0
            ? html`<div class="empty-state" style="padding: 16px; font-size: 13px;">
                No tasks yet
              </div>`
            : tasksForColumn.map((task) => this._renderTask(task))}
        </div>
      </div>
    `;
  }

  private _renderTask(task: DoBeeDoTaskSummary): TemplateResult {
    const isEditing = this._editingTaskId === task.id;
    const isMoving = this._movingTaskId === task.id;

    if (isEditing) {
      return html`
        <div class="task-card" style="padding: 16px;">
          <div style="margin-bottom: 8px;">
            <input
              type="text"
              .value=${this._editTaskTitle}
              placeholder="Task title"
              @input=${(ev: Event) => {
                const target = ev.target as HTMLInputElement;
                this._editTaskTitle = target.value;
              }}
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="text"
              .value=${this._editTaskDescription}
              placeholder="Description (optional)"
              @input=${(ev: Event) => {
                const target = ev.target as HTMLInputElement;
                this._editTaskDescription = target.value;
              }}
              style="width: 100%;"
            />
          </div>
          <div class="task-actions">
            <button class="primary small" @click=${() => this._saveEditTask()}>Save</button>
            <button class="secondary small" @click=${() => this._cancelEditTask()}>Cancel</button>
          </div>
        </div>
      `;
    }

    if (isMoving) {
      return html`
        <div class="task-card" style="padding: 16px;">
          <div class="task-title" style="margin-bottom: 8px;">${task.title}</div>
          <div style="font-size: 12px; margin-bottom: 8px; color: var(--secondary-text-color);">
            Move to column:
          </div>
          <select
            style="width: 100%; margin-bottom: 8px;"
            @change=${(ev: Event) => {
              const target = ev.target as HTMLSelectElement;
              void this._handleMoveTask(task, target.value);
            }}
          >
            <option value="">-- Select column --</option>
            ${this._columns.map(
              (col) => html`
                <option value=${col.id} ?selected=${col.id === task.column_id}>
                  ${col.name} ${col.id === task.column_id ? "(current)" : ""}
                </option>
              `,
            )}
          </select>
          <button class="secondary small" @click=${() => this._cancelMoveTask()}>Cancel</button>
        </div>
      `;
    }

    return html`
      <div class="task-card">
        <div class="task-title">${task.title}</div>
        ${task.description ? html`<div class="task-description">${task.description}</div>` : ""}
        <div class="task-actions">
          <button class="secondary small" @click=${() => this._startEditTask(task)}>Edit</button>
          <button class="secondary small" @click=${() => this._startMoveTask(task)}>Move</button>
          <button class="warning small" @click=${() => this._handleDeleteTask(task)}>Delete</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dobeedo-panel": DoBeeDoPanel;
  }
}
