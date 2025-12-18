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
  private _newTaskTitles: Record<string, string> = {};

  @state()
  private _newTaskDescriptions: Record<string, string> = {};

  @state()
  private _newTaskDueDates: Record<string, string> = {};

  @state()
  private _newTaskPriorities: Record<string, string> = {};

  @state()
  private _newTaskTags: Record<string, string> = {};

  @state()
  private _newColumnName = "";

  @state()
  private _newBoardName = "";

  @state()
  private _isAddingBoard = false;

  @state()
  private _unsubscribeUpdates: (() => void) | null = null;

  @state()
  private _selectedBoardId: string | null = null;

  @state()
  private _editingTaskId: string | null = null;

  @state()
  private _editTaskTitle: string = "";

  @state()
  private _editTaskDescription: string = "";

  @state()
  private _editTaskDueDate: string = "";

  @state()
  private _editTaskPriority: string = "";

  @state()
  private _editTaskTags: string = "";

  @state()
  private _draggingTaskId: string | null = null;

  @state()
  private _dragOverColumnId: string | null = null;

  @state()
  private _dropIndicatorPosition: { columnId: string; index: number } | null = null;

  @state()
  private _touchDragging: boolean = false;

  @state()
  private _touchStartY: number = 0;

  @state()
  private _touchCurrentY: number = 0;

  @state()
  private _importingColumnId: string | null = null;

  @state()
  private _todoEntities: any[] = [];

  @state()
  private _selectedTodoEntity: string | null = null;

  @state()
  private _importStatusFilter: string = "";

  private _boundTouchMove: ((ev: TouchEvent) => void) | null = null;
  private _boundTouchEnd: ((ev: TouchEvent) => void) | null = null;

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 24px;
        background: var(--primary-background-color);
        height: 100vh;
        color: var(--primary-text-color);
        overflow: hidden;
      }

      h1 {
        margin: 0 0 24px 0;
        font-size: 2em;
        font-weight: 300;
        color: var(--primary-text-color);
        flex-shrink: 0;
      }

      .empty-state {
        padding: 40px;
        text-align: center;
        color: var(--secondary-text-color);
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
        border: 2px solid var(--primary-text-color);
        opacity: 0.8;
      }

      button.secondary:hover:not(:disabled) {
        opacity: 1;
        border-color: var(--primary-color);
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
        border: 2px solid var(--input-idle-line-color, var(--divider-color));
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
        box-shadow: 0 0 0 1px var(--primary-color);
      }

      select option {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        padding: 8px;
      }

      /* Board tabs selector */
      .board-tabs {
        display: flex;
        margin-bottom: 0;
        background: var(--secondary-background-color);
        border-bottom: 2px solid var(--accent-color, var(--primary-color));
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: thin;
        flex-shrink: 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .board-tab {
        position: relative;
        padding: 16px 24px;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        margin-bottom: -1px;
        color: var(--secondary-text-color);
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 8px;
        background: transparent;
      }

      .board-tab:hover:not(.selected) {
        color: var(--primary-text-color);
        background: var(--secondary-background-color);
      }

      .board-tab.selected {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
        font-weight: 500;
      }

      .board-tab-delete {
        padding: 0;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: transparent;
        color: var(--secondary-text-color);
        border: none;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all 0.2s ease;
      }

      .board-tab:hover .board-tab-delete {
        opacity: 0.7;
      }

      .board-tab-delete:hover {
        opacity: 1 !important;
        color: var(--warning-color);
        background: rgba(244, 67, 54, 0.1);
      }

      .board-tab.add-tab {
        color: var(--primary-color);
        padding: 12px 16px;
      }

      .board-tab.add-tab:hover {
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      .board-tab.add-tab.editing {
        min-width: 200px;
        padding: 8px 12px;
      }

      .add-board-input {
        background: transparent;
        border: 1px solid var(--primary-color);
        border-radius: 4px;
        padding: 6px 8px;
        color: var(--primary-text-color);
        font-size: 14px;
        width: 150px;
        outline: none;
      }

      .add-board-input::placeholder {
        color: var(--secondary-text-color);
        opacity: 0.7;
      }

      .add-board-actions {
        display: flex;
        gap: 4px;
        align-items: center;
      }

      /* Board content wrapper */
      .board-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        margin-top: 24px;
      }

      /* Columns layout */
      .columns-container {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: 16px;
        flex: 1;
      }

      .column {
        flex: 0 0 300px;
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: var(--ha-card-border-radius, 12px);
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        height: 100%;
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
        background: var(--secondary-background-color);
        padding: 2px 8px;
        border-radius: 12px;
      }

      .tasks-list {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-height: 100px;
      }

      /* Task cards */
      .task-card {
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-left: 3px solid var(--primary-color);
        border-radius: 8px;
        padding: 12px;
        cursor: grab;
        transition: all 0.2s ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
      }

      .task-card:hover {
        border-left-width: 4px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }

      .task-card.dragging {
        opacity: 0.5;
        cursor: grabbing;
      }

      /* Drop position indicators - simple border highlights */
      .task-card.drop-target-before {
        border-top: 4px solid var(--primary-color);
        box-shadow: 0 -4px 8px rgba(var(--rgb-primary-color, 33, 150, 243), 0.4),
                    0 1px 3px rgba(0, 0, 0, 0.12);
      }

      .task-card.drop-target-after {
        border-bottom: 4px solid var(--primary-color);
        box-shadow: 0 4px 8px rgba(var(--rgb-primary-color, 33, 150, 243), 0.4),
                    0 1px 3px rgba(0, 0, 0, 0.12);
      }

      /* Empty list drop indicator */
      .tasks-list.drop-target-empty {
        border: 3px dashed var(--primary-color);
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.1);
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .tasks-list.drop-target-empty::after {
        content: "Drop here";
        color: var(--primary-color);
        font-weight: 500;
        opacity: 0.7;
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

      .task-due-date {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
        padding: 4px 8px;
        border-radius: 4px;
        background: var(--primary-background-color);
        border: 1px solid var(--divider-color);
        display: inline-block;
      }

      .task-due-date.overdue {
        color: var(--warning-color);
        background: rgba(244, 67, 54, 0.1);
        font-weight: 500;
      }

      .task-card.overdue {
        border-left-color: var(--warning-color);
      }

      .task-priority {
        font-size: 11px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 12px;
        display: inline-block;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .task-priority.high {
        background: rgba(244, 67, 54, 0.15);
        color: #d32f2f;
        border: 1px solid rgba(244, 67, 54, 0.3);
      }

      .task-priority.medium {
        background: rgba(255, 152, 0, 0.15);
        color: #f57c00;
        border: 1px solid rgba(255, 152, 0, 0.3);
      }

      .task-priority.low {
        background: rgba(33, 150, 243, 0.15);
        color: #1976d2;
        border: 1px solid rgba(33, 150, 243, 0.3);
      }

      .task-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 8px;
      }

      .task-tag {
        font-size: 11px;
        font-weight: 500;
        padding: 2px 8px;
        border-radius: 12px;
        background: rgba(156, 39, 176, 0.12);
        color: #7b1fa2;
        border: 1px solid rgba(156, 39, 176, 0.25);
      }

      .task-actions {
        display: flex;
        gap: 4px;
        margin-top: 8px;
      }

      /* Add task form at bottom of columns */
      .add-task-form {
        margin-top: 8px;
        padding: 8px;
        border-top: 1px solid var(--divider-color);
      }

      .add-task-input {
        width: 100%;
        margin-bottom: 8px;
      }

      .add-task-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .add-task-buttons {
        display: flex;
        gap: 4px;
      }

      /* Add column mock */
      .add-column-mock {
        background: transparent;
        border: 2px dashed var(--primary-text-color);
        opacity: 0.3;
        min-height: 60px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        transition: all 0.2s ease;
        box-shadow: none;
      }

      .add-column-mock:hover {
        opacity: 0.8;
        border-color: var(--primary-color);
        border-style: solid;
        background: var(--card-background-color);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .add-column-form {
        padding: 16px;
        width: 100%;
      }

      .add-column-input {
        width: 100%;
        margin-bottom: 8px;
        background: transparent;
        border: none;
        font-size: 14px;
        font-weight: 400;
      }

      .add-column-input:focus {
        background: var(--input-fill-color, var(--secondary-background-color));
        border: 1px solid var(--input-hover-line-color, var(--primary-color));
      }

      .add-column-input::placeholder {
        color: var(--secondary-text-color);
        opacity: 0.8;
      }

      .add-column-buttons {
        display: flex;
        gap: 4px;
        justify-content: center;
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

      /* Import dialog */
      .import-dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .import-dialog {
        background: var(--card-background-color);
        border-radius: var(--ha-card-border-radius, 12px);
        padding: 24px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }

      .import-dialog-title {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 16px;
        color: var(--primary-text-color);
      }

      .import-dialog-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .import-dialog-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 16px;
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
      return;
    }
    const api = new DoBeeDoApiClient(this.hass.connection);
    this._columns = await api.getColumns(this._selectedBoardId);
    this._tasks = await api.getTasks(this._selectedBoardId);
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

  private async _handleCreateTask(columnId: string): Promise<void> {
    const title = this._newTaskTitles[columnId] || "";
    const description = this._newTaskDescriptions[columnId] || "";
    const dueDate = this._newTaskDueDates[columnId] || "";
    const priority = this._newTaskPriorities[columnId] || "";
    const tagsStr = this._newTaskTags[columnId] || "";

    if (!this.hass || !this._selectedBoardId || !title.trim()) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    const board = this._boards.find((b) => b.id === this._selectedBoardId);
    if (!board) {
      return;
    }

    // Parse tags from comma-separated string
    const tags = tagsStr
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    try {
      await api.createTask(
        board.id,
        columnId,
        title.trim(),
        description.trim() || undefined,
        dueDate.trim() || undefined,
        priority.trim() || undefined,
        tags.length > 0 ? tags : undefined,
      );
      // Clear input for this column
      delete this._newTaskTitles[columnId];
      delete this._newTaskDescriptions[columnId];
      delete this._newTaskDueDates[columnId];
      delete this._newTaskPriorities[columnId];
      delete this._newTaskTags[columnId];
      this._newTaskTitles = { ...this._newTaskTitles };
      this._newTaskDescriptions = { ...this._newTaskDescriptions };
      this._newTaskDueDates = { ...this._newTaskDueDates };
      this._newTaskPriorities = { ...this._newTaskPriorities };
      this._newTaskTags = { ...this._newTaskTags };

      // WebSocket event will refresh the tasks automatically
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
      await api.createColumn(this._selectedBoardId, this._newColumnName.trim());
      this._newColumnName = "";

      // WebSocket event will refresh the columns automatically
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to create DoBeeDo column", err);
    }
  }

  private async _handleCreateBoard(): Promise<void> {
    if (!this.hass || !this._newBoardName.trim()) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      const newBoard = await api.createBoard(this._newBoardName.trim());
      this._newBoardName = "";
      this._isAddingBoard = false;

      // Wait for WebSocket event to refresh boards, then select the new one
      // For now, manually refresh and select
      await this._fetchBoards();
      this._selectedBoardId = newBoard.id;
      await this._refreshColumnsAndTasks();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to create DoBeeDo board", err);
    }
  }

  private async _handleDeleteBoard(board: DoBeeDoBoardSummary): Promise<void> {
    if (!this.hass) {
      return;
    }

    if (!window.confirm(`Delete board "${board.name}" and all its columns and tasks?`)) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      await api.deleteBoard(board.id);

      // Wait for boards to refresh, then select first remaining board
      await this._fetchBoards();

      // If we deleted the selected board, select the first remaining one
      if (this._selectedBoardId === board.id) {
        this._selectedBoardId = this._boards.length > 0 ? this._boards[0].id : null;
        await this._refreshColumnsAndTasks();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to delete DoBeeDo board", err);
    }
  }

  private _startEditTask(task: DoBeeDoTaskSummary): void {
    this._editingTaskId = task.id;
    this._editTaskTitle = task.title;
    this._editTaskDescription = task.description ?? "";
    this._editTaskDueDate = task.due_date ?? "";
    this._editTaskPriority = task.priority ?? "";
    this._editTaskTags = task.tags ? task.tags.join(", ") : "";
  }

  private _cancelEditTask(): void {
    this._editingTaskId = null;
    this._editTaskTitle = "";
    this._editTaskDescription = "";
    this._editTaskDueDate = "";
    this._editTaskPriority = "";
    this._editTaskTags = "";
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

    const updates: { title?: string; description?: string | null; due_date?: string | null; priority?: string | null; tags?: string[] | null } = {};

    if (trimmedTitle !== task.title) {
      updates.title = trimmedTitle;
    }

    const trimmedDescription = this._editTaskDescription.trim();
    if (trimmedDescription !== (task.description ?? "")) {
      updates.description = trimmedDescription === "" ? null : trimmedDescription;
    }

    const trimmedDueDate = this._editTaskDueDate.trim();
    if (trimmedDueDate !== (task.due_date ?? "")) {
      updates.due_date = trimmedDueDate === "" ? null : trimmedDueDate;
    }

    const trimmedPriority = this._editTaskPriority.trim();
    if (trimmedPriority !== (task.priority ?? "")) {
      updates.priority = trimmedPriority === "" ? null : trimmedPriority;
    }

    // Parse tags from comma-separated string
    const tagsStr = this._editTaskTags.trim();
    const newTags = tagsStr
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const currentTags = task.tags || [];
    const tagsChanged =
      newTags.length !== currentTags.length || newTags.some((tag, i) => tag !== currentTags[i]);
    if (tagsChanged) {
      updates.tags = newTags.length > 0 ? newTags : null;
    }

    if (!updates.title && updates.description === undefined && updates.due_date === undefined && updates.priority === undefined && updates.tags === undefined) {
      this._cancelEditTask();
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      await api.updateTask(this._editingTaskId, updates);
      this._cancelEditTask();
      // WebSocket event will refresh the task automatically
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to update DoBeeDo task", err);
    }
  }

  private _handleDragStart(task: DoBeeDoTaskSummary, ev: DragEvent): void {
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.setData("text/plain", task.id);
      // Set a transparent drag image for cleaner appearance
      const img = new Image();
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      ev.dataTransfer.setDragImage(img, 0, 0);
    }
    // Defer state update to avoid re-render interfering with drag initialization
    requestAnimationFrame(() => {
      this._draggingTaskId = task.id;
    });
  }

  private _handleDragEnd(): void {
    this._draggingTaskId = null;
    this._dragOverColumnId = null;
    this._dropIndicatorPosition = null;
  }

  private _handleTouchStart(task: DoBeeDoTaskSummary, ev: TouchEvent): void {
    // Prevent default to avoid scrolling while dragging
    ev.preventDefault();

    const touch = ev.touches[0];
    this._touchStartY = touch.clientY;
    this._touchCurrentY = touch.clientY;
    this._touchDragging = true;
    this._draggingTaskId = task.id;

    // Add global listeners now that drag has started
    this._boundTouchMove = this._handleTouchMove.bind(this);
    this._boundTouchEnd = this._handleTouchEnd.bind(this);
    document.addEventListener('touchmove', this._boundTouchMove, { passive: false });
    document.addEventListener('touchend', this._boundTouchEnd, { passive: false });
  }

  private _handleTouchMove(ev: TouchEvent): void {
    if (!this._touchDragging || !this._draggingTaskId) {
      return;
    }

    ev.preventDefault();
    const touch = ev.touches[0];
    this._touchCurrentY = touch.clientY;

    // Find which column and position we're over
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);

    // Look for a tasks-list element
    for (const el of elements) {
      if (el.classList.contains('tasks-list')) {
        const columnEl = el.closest('.column');
        if (columnEl) {
          const columnId = this._getColumnIdFromElement(columnEl as HTMLElement);
          if (columnId) {
            this._dragOverColumnId = columnId;
            this._calculateTouchDropPosition(columnId, touch.clientY);
            break;
          }
        }
      }
    }
  }

  private _handleTouchEnd(ev: TouchEvent): void {
    if (!this._touchDragging || !this._draggingTaskId) {
      return;
    }

    ev.preventDefault();

    // Perform the drop if we have a valid drop position
    if (this._dropIndicatorPosition) {
      const dropEvent = new DragEvent('drop');
      void this._handleDrop(this._dropIndicatorPosition.columnId, dropEvent);
    }

    // Remove global listeners now that drag is done
    if (this._boundTouchMove) {
      document.removeEventListener('touchmove', this._boundTouchMove);
      this._boundTouchMove = null;
    }
    if (this._boundTouchEnd) {
      document.removeEventListener('touchend', this._boundTouchEnd);
      this._boundTouchEnd = null;
    }

    // Clean up touch state
    this._touchDragging = false;
    this._draggingTaskId = null;
    this._dragOverColumnId = null;
    this._dropIndicatorPosition = null;
    this._touchStartY = 0;
    this._touchCurrentY = 0;
  }

  private _getColumnIdFromElement(columnEl: HTMLElement): string | null {
    // Find the column by looking through our columns and matching the rendered elements
    const columns = this.shadowRoot?.querySelectorAll('.column');
    if (!columns) return null;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i] === columnEl && i < this._columns.length) {
        return this._columns[i].id;
      }
    }
    return null;
  }

  private _calculateTouchDropPosition(columnId: string, touchY: number): void {
    const columnEl = Array.from(this.shadowRoot?.querySelectorAll('.column') || [])
      .find(el => this._getColumnIdFromElement(el as HTMLElement) === columnId);

    if (!columnEl) return;

    const tasksListEl = columnEl.querySelector('.tasks-list');
    if (!tasksListEl) return;

    const taskElements = Array.from(tasksListEl.querySelectorAll('.task-card:not(.dragging)'));

    if (taskElements.length === 0) {
      this._dropIndicatorPosition = { columnId, index: 0 };
      return;
    }

    // Calculate drop zones based on midpoints between tasks (covers gaps)
    // Each task's "center line" divides the drop zone between before/after
    let dropIndex = taskElements.length; // Default to end

    for (let i = 0; i < taskElements.length; i++) {
      const rect = taskElements[i].getBoundingClientRect();
      const taskMiddle = rect.top + rect.height / 2;

      // For each task, if touch is above its middle, drop before it
      if (touchY < taskMiddle) {
        dropIndex = i;
        break;
      }
    }

    this._dropIndicatorPosition = { columnId, index: dropIndex };
  }

  private _handleDragOver(ev: DragEvent): void {
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = "move";
    }
  }

  private _handleDragOverTasksList(columnId: string, ev: DragEvent): void {
    ev.preventDefault();
    ev.stopPropagation();

    if (!this._draggingTaskId) {
      return;
    }

    const tasksListEl = ev.currentTarget as HTMLElement;
    const taskElements = Array.from(tasksListEl.querySelectorAll(".task-card:not(.dragging)"));
    const mouseY = ev.clientY;

    // If there are no tasks, drop at position 0
    if (taskElements.length === 0) {
      this._dropIndicatorPosition = { columnId, index: 0 };
      return;
    }

    // Calculate drop zones based on midpoints between tasks (covers gaps)
    // Each task's "center line" divides the drop zone between before/after
    let dropIndex = taskElements.length; // Default to end

    for (let i = 0; i < taskElements.length; i++) {
      const rect = taskElements[i].getBoundingClientRect();
      const taskMiddle = rect.top + rect.height / 2;

      // For each task, if mouse is above its middle, drop before it
      if (mouseY < taskMiddle) {
        dropIndex = i;
        break;
      }
    }

    // Only update if the position actually changed (reduces flickering)
    if (
      !this._dropIndicatorPosition ||
      this._dropIndicatorPosition.columnId !== columnId ||
      this._dropIndicatorPosition.index !== dropIndex
    ) {
      this._dropIndicatorPosition = { columnId, index: dropIndex };
    }
  }

  private _handleDragEnterColumn(columnId: string, ev: DragEvent): void {
    ev.stopPropagation();
    this._dragOverColumnId = columnId;
  }

  private _handleDragLeaveColumn(ev: DragEvent): void {
    // Only clear if we're actually leaving the column element itself
    const currentTarget = ev.currentTarget as HTMLElement;
    const relatedTarget = ev.relatedTarget as Node;

    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      this._dragOverColumnId = null;
      this._dropIndicatorPosition = null;
    }
  }

  private _isTaskOverdue(task: DoBeeDoTaskSummary): boolean {
    if (!task.due_date) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.due_date);
    return dueDate < today;
  }

  private _formatDueDate(dueDate: string): string {
    const date = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate.getTime() === today.getTime()) {
      return "Today";
    } else if (taskDate.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    } else {
      // Format as "Mon DD" or "MMM DD" depending on preference
      const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    }
  }

  private async _handleDrop(columnId: string, ev: DragEvent): Promise<void> {
    ev.preventDefault();
    ev.stopPropagation();
    this._dragOverColumnId = null;

    if (!this._draggingTaskId || !this.hass) {
      return;
    }

    const task = this._tasks.find((t) => t.id === this._draggingTaskId);
    if (!task) {
      this._draggingTaskId = null;
      return;
    }

    // Use the pre-calculated drop position from dragover events
    // This ensures we drop exactly where the indicator was shown
    const targetIndex = this._dropIndicatorPosition?.index ?? 0;

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      await api.moveTask(task.id, columnId, targetIndex);
      this._draggingTaskId = null;
      this._dropIndicatorPosition = null;
      // WebSocket event will refresh the task automatically
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to move task via drag-and-drop", err);
      this._draggingTaskId = null;
      this._dropIndicatorPosition = null;
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
      // WebSocket event will refresh the tasks automatically
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
      // WebSocket event will refresh the columns and tasks automatically
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to delete DoBeeDo column", err);
    }
  }

  private async _startImport(columnId: string): Promise<void> {
    if (!this.hass) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      this._todoEntities = await api.listTodoEntities();
      this._importingColumnId = columnId;
      this._selectedTodoEntity = null;
      this._importStatusFilter = "";
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to load todo entities", err);
    }
  }

  private _cancelImport(): void {
    this._importingColumnId = null;
    this._todoEntities = [];
    this._selectedTodoEntity = null;
    this._importStatusFilter = "";
  }

  private async _handleImport(): Promise<void> {
    if (!this.hass || !this._selectedTodoEntity || !this._importingColumnId || !this._selectedBoardId) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      const result = await api.importFromTodo(
        this._selectedTodoEntity,
        this._selectedBoardId,
        this._importingColumnId,
        this._importStatusFilter || undefined,
      );

      // Show success message
      alert(`Successfully imported ${result.imported_count} task${result.imported_count === 1 ? "" : "s"}!`);

      // Close dialog
      this._cancelImport();

      // WebSocket event will refresh the tasks automatically
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to import from todo", err);
      alert("Failed to import tasks. See console for details.");
    }
  }

  private async _handleImportAll(): Promise<void> {
    if (!this.hass || !this._selectedBoardId) {
      return;
    }

    if (!window.confirm("Import all Home Assistant todo lists as columns? This will create one column per todo list and import all their items.")) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      const result = await api.importAllTodos(this._selectedBoardId);

      // Show success message
      alert(
        `Successfully imported ${result.columns_created} todo list${result.columns_created === 1 ? "" : "s"} ` +
        `with ${result.total_imported} task${result.total_imported === 1 ? "" : "s"}!`
      );

      // WebSocket events will refresh the columns and tasks automatically
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to import all todos", err);
      alert("Failed to import todo lists. See console for details.");
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Touch event listeners are now added dynamically in _handleTouchStart
    // and removed in _handleTouchEnd to avoid scroll-blocking warnings
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._unsubscribeUpdates) {
      this._unsubscribeUpdates();
      this._unsubscribeUpdates = null;
    }
    // Clean up touch event listeners if component is disconnected during drag
    if (this._boundTouchMove) {
      document.removeEventListener('touchmove', this._boundTouchMove);
      this._boundTouchMove = null;
    }
    if (this._boundTouchEnd) {
      document.removeEventListener('touchend', this._boundTouchEnd);
      this._boundTouchEnd = null;
    }
  }

  protected render(): TemplateResult {
    return html`
      <h1>DoBeeDo</h1>
      ${this._loading ? html`<p>Loading boards…</p>` : this._renderContent()}
      ${this._importingColumnId ? this._renderImportDialog() : ""}
    `;
  }

  private _renderContent(): TemplateResult {
    if (this._boards.length === 0) {
      return html`
        <div class="empty-state">
          <p>No boards available yet.</p>
          <p>Create a board using the input above to get started!</p>
        </div>
      `;
    }

    return html`
      ${this._renderBoardSelector()}
      <div class="board-content">
        ${this._selectedBoardId ? this._renderBoard() : html`<p>Select a board to begin</p>`}
      </div>
    `;
  }

  private _renderBoardSelector(): TemplateResult {
    return html`
      <div class="board-tabs">
        ${this._boards.map(
          (board) => html`
            <div
              class="board-tab ${board.id === this._selectedBoardId ? "selected" : ""}"
              @click=${() => this._handleSelectBoard(board)}
            >
              <span>${board.name}</span>
              <button
                class="board-tab-delete"
                @click=${(ev: Event) => {
                  ev.stopPropagation();
                  this._handleDeleteBoard(board);
                }}
                title="Delete board"
              >
                ×
              </button>
            </div>
          `,
        )}
        ${this._isAddingBoard
          ? html`
              <div class="board-tab add-tab editing">
                <input
                  type="text"
                  class="add-board-input"
                  .value=${this._newBoardName}
                  placeholder="Board name"
                  @input=${(ev: Event) => {
                    const target = ev.target as HTMLInputElement;
                    this._newBoardName = target.value;
                  }}
                  @keydown=${(ev: KeyboardEvent) => {
                    if (ev.key === "Enter" && this._newBoardName.trim()) {
                      void this._handleCreateBoard();
                    } else if (ev.key === "Escape") {
                      this._isAddingBoard = false;
                      this._newBoardName = "";
                    }
                  }}
                  @blur=${() => {
                    if (!this._newBoardName.trim()) {
                      this._isAddingBoard = false;
                    }
                  }}
                />
                <div class="add-board-actions">
                  <button
                    class="primary small"
                    @click=${() => this._handleCreateBoard()}
                    ?disabled=${!this._newBoardName.trim()}
                  >
                    Add
                  </button>
                  <button
                    class="secondary small"
                    @click=${() => {
                      this._isAddingBoard = false;
                      this._newBoardName = "";
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            `
          : html`
              <div
                class="board-tab add-tab"
                @click=${() => {
                  this._isAddingBoard = true;
                  setTimeout(() => {
                    const input = this.shadowRoot?.querySelector(".add-board-input") as HTMLInputElement;
                    input?.focus();
                  }, 50);
                }}
                title="Add new board"
              >
                + Add Board
              </div>
            `}
      </div>
    `;
  }

  private _renderBoard(): TemplateResult {
    const hasNoColumns = this._columns.length === 0;

    return html`
      ${hasNoColumns
        ? html`
            <div style="margin-bottom: 16px; padding: 16px; background: var(--card-background-color); border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 12px 0; color: var(--secondary-text-color);">
                No columns yet. Create columns manually or import from your Home Assistant todo lists.
              </p>
              <button class="primary" @click=${() => this._handleImportAll()}>
                📥 Import All Todo Lists
              </button>
            </div>
          `
        : html`
            <div style="margin-bottom: 12px; display: flex; justify-content: flex-end;">
              <button class="secondary small" @click=${() => this._handleImportAll()} title="Import all todo lists as columns">
                📥 Import All
              </button>
            </div>
          `}
      <div class="columns-container">
        ${this._columns.map((col) => this._renderColumn(col))} ${this._renderAddColumnMock()}
      </div>
    `;
  }

  private _renderAddColumnMock(): TemplateResult {
    return html`
      <div class="column add-column-mock">
        <div class="add-column-form">
          <input
            type="text"
            class="add-column-input"
            .value=${this._newColumnName}
            placeholder="Add column..."
            @input=${(ev: Event) => {
              const target = ev.target as HTMLInputElement;
              this._newColumnName = target.value;
            }}
            @keydown=${(ev: KeyboardEvent) => {
              if (ev.key === "Enter" && this._newColumnName.trim()) {
                void this._handleCreateColumn();
              }
            }}
          />
          ${this._newColumnName.trim()
            ? html`
                <div class="add-column-buttons">
                  <button class="primary small" @click=${() => this._handleCreateColumn()}>
                    Add
                  </button>
                  <button
                    class="secondary small"
                    @click=${() => {
                      this._newColumnName = "";
                    }}
                  >
                    Cancel
                  </button>
                </div>
              `
            : ""}
        </div>
      </div>
    `;
  }

  private _renderColumn(column: DoBeeDoColumnSummary): TemplateResult {
    const tasksForColumn = this._tasks
      .filter((task) => task.column_id === column.id)
      .sort((a, b) => a.sort_index - b.sort_index);

    return html`
      <div
        class="column"
        @dragover=${this._handleDragOver}
        @dragenter=${(ev: DragEvent) => this._handleDragEnterColumn(column.id, ev)}
        @dragleave=${(ev: DragEvent) => this._handleDragLeaveColumn(ev)}
        @drop=${(ev: DragEvent) => this._handleDrop(column.id, ev)}
      >
        <div class="column-header">
          <div class="column-header-left">
            <span>${column.name}</span>
            <span class="task-count">${tasksForColumn.length}</span>
          </div>
          <div style="display: flex; gap: 4px;">
            <button
              class="secondary small"
              @click=${() => this._startImport(column.id)}
              title="Import from To-do list"
            >
              ↓
            </button>
            <button
              class="warning small"
              @click=${() => this._handleDeleteColumn(column)}
              title="Delete column"
            >
              ×
            </button>
          </div>
        </div>
        <div
          class="tasks-list ${
            tasksForColumn.length === 0 &&
            this._dropIndicatorPosition?.columnId === column.id
              ? "drop-target-empty"
              : ""
          }"
          @dragover=${(ev: DragEvent) => this._handleDragOverTasksList(column.id, ev)}
          @drop=${(ev: DragEvent) => this._handleDrop(column.id, ev)}
        >
          ${tasksForColumn.length === 0
            ? html`
                <div class="empty-state" style="padding: 16px; font-size: 13px;">
                  No tasks yet
                </div>
              `
            : html`
                ${tasksForColumn.map((task, index) => {
                  // Determine if this task should show drop indicators
                  const shouldShowDropBefore =
                    this._dropIndicatorPosition?.columnId === column.id &&
                    this._dropIndicatorPosition?.index === index;
                  const shouldShowDropAfter =
                    this._dropIndicatorPosition?.columnId === column.id &&
                    this._dropIndicatorPosition?.index === index + 1;

                  return this._renderTask(task, shouldShowDropBefore, shouldShowDropAfter);
                })}
              `}
        </div>
        <div class="add-task-form">
          <input
            type="text"
            class="add-task-input"
            .value=${this._newTaskTitles[column.id] || ""}
            placeholder="Add a task..."
            @input=${(ev: Event) => {
              const target = ev.target as HTMLInputElement;
              this._newTaskTitles = { ...this._newTaskTitles, [column.id]: target.value };
            }}
            @keydown=${(ev: KeyboardEvent) => {
              const title = this._newTaskTitles[column.id] || "";
              if (ev.key === "Enter" && title.trim()) {
                void this._handleCreateTask(column.id);
              }
            }}
          />
          ${(this._newTaskTitles[column.id] || "").trim()
            ? html`
                <div class="add-task-actions">
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskDescriptions[column.id] || ""}
                    placeholder="Description (optional)"
                    @input=${(ev: Event) => {
                      const target = ev.target as HTMLInputElement;
                      this._newTaskDescriptions = {
                        ...this._newTaskDescriptions,
                        [column.id]: target.value,
                      };
                    }}
                    @keydown=${(ev: KeyboardEvent) => {
                      if (ev.key === "Enter") {
                        void this._handleCreateTask(column.id);
                      }
                    }}
                  />
                  <input
                    type="date"
                    class="add-task-input"
                    .value=${this._newTaskDueDates[column.id] || ""}
                    placeholder="Due date (optional)"
                    @input=${(ev: Event) => {
                      const target = ev.target as HTMLInputElement;
                      this._newTaskDueDates = {
                        ...this._newTaskDueDates,
                        [column.id]: target.value,
                      };
                    }}
                    @keydown=${(ev: KeyboardEvent) => {
                      if (ev.key === "Enter") {
                        void this._handleCreateTask(column.id);
                      }
                    }}
                  />
                  <select
                    class="add-task-input"
                    .value=${this._newTaskPriorities[column.id] || ""}
                    @change=${(ev: Event) => {
                      const target = ev.target as HTMLSelectElement;
                      this._newTaskPriorities = {
                        ...this._newTaskPriorities,
                        [column.id]: target.value,
                      };
                    }}
                  >
                    <option value="">No priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <input
                    type="text"
                    class="add-task-input"
                    .value=${this._newTaskTags[column.id] || ""}
                    placeholder="Tags (comma-separated, optional)"
                    @input=${(ev: Event) => {
                      const target = ev.target as HTMLInputElement;
                      this._newTaskTags = {
                        ...this._newTaskTags,
                        [column.id]: target.value,
                      };
                    }}
                    @keydown=${(ev: KeyboardEvent) => {
                      if (ev.key === "Enter") {
                        void this._handleCreateTask(column.id);
                      }
                    }}
                  />
                  <div class="add-task-buttons">
                    <button class="primary small" @click=${() => this._handleCreateTask(column.id)}>
                      Add
                    </button>
                    <button
                      class="secondary small"
                      @click=${() => {
                        delete this._newTaskTitles[column.id];
                        delete this._newTaskDescriptions[column.id];
                        delete this._newTaskDueDates[column.id];
                        delete this._newTaskPriorities[column.id];
                        delete this._newTaskTags[column.id];
                        this._newTaskTitles = { ...this._newTaskTitles };
                        this._newTaskDescriptions = { ...this._newTaskDescriptions };
                        this._newTaskDueDates = { ...this._newTaskDueDates };
                        this._newTaskPriorities = { ...this._newTaskPriorities };
                        this._newTaskTags = { ...this._newTaskTags };
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              `
            : ""}
        </div>
      </div>
    `;
  }

  private _renderTask(
    task: DoBeeDoTaskSummary,
    showDropBefore: boolean = false,
    showDropAfter: boolean = false
  ): TemplateResult {
    const isEditing = this._editingTaskId === task.id;

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
              style="width: 100%; margin-bottom: 8px;"
            />
            <input
              type="date"
              .value=${this._editTaskDueDate}
              placeholder="Due date (optional)"
              @input=${(ev: Event) => {
                const target = ev.target as HTMLInputElement;
                this._editTaskDueDate = target.value;
              }}
              style="width: 100%; margin-bottom: 8px;"
            />
            <select
              .value=${this._editTaskPriority}
              @change=${(ev: Event) => {
                const target = ev.target as HTMLSelectElement;
                this._editTaskPriority = target.value;
              }}
              style="width: 100%; margin-bottom: 8px;"
            >
              <option value="">No priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="text"
              .value=${this._editTaskTags}
              placeholder="Tags (comma-separated, optional)"
              @input=${(ev: Event) => {
                const target = ev.target as HTMLInputElement;
                this._editTaskTags = target.value;
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

    const isDragging = this._draggingTaskId === task.id;
    const isOverdue = this._isTaskOverdue(task);

    return html`
      <div
        class="task-card ${isDragging ? "dragging" : ""} ${isOverdue ? "overdue" : ""} ${
          showDropBefore ? "drop-target-before" : ""
        } ${showDropAfter ? "drop-target-after" : ""}"
        draggable="true"
        @dragstart=${(ev: DragEvent) => this._handleDragStart(task, ev)}
        @dragend=${this._handleDragEnd}
        @touchstart=${(ev: TouchEvent) => this._handleTouchStart(task, ev)}
      >
        <div class="task-title">${task.title}</div>
        ${task.description ? html`<div class="task-description">${task.description}</div>` : ""}
        ${task.priority
          ? html`<div class="task-priority ${task.priority}">${task.priority}</div>`
          : ""}
        ${task.tags && task.tags.length > 0
          ? html`<div class="task-tags">
              ${task.tags.map((tag) => html`<span class="task-tag">${tag}</span>`)}
            </div>`
          : ""}
        ${task.due_date
          ? html`<div class="task-due-date ${isOverdue ? "overdue" : ""}">
              📅 ${this._formatDueDate(task.due_date)}
            </div>`
          : ""}
        <div class="task-actions">
          <button class="secondary small" draggable="false" @click=${() => this._startEditTask(task)}>Edit</button>
          <button class="warning small" draggable="false" @click=${() => this._handleDeleteTask(task)}>Delete</button>
        </div>
      </div>
    `;
  }


  private _renderImportDialog(): TemplateResult {
    const column = this._columns.find((col) => col.id === this._importingColumnId);
    const columnName = column?.name || "Unknown";

    return html`
      <div class="import-dialog-overlay" @click=${this._cancelImport}>
        <div class="import-dialog" @click=${(ev: Event) => ev.stopPropagation()}>
          <div class="import-dialog-title">Import from To-do List to "${columnName}"</div>
          <div class="import-dialog-content">
            ${this._todoEntities.length === 0
              ? html`<p style="color: var(--secondary-text-color);">No to-do lists found in Home Assistant.</p>`
              : html`
                  <div>
                    <label class="form-label">Select To-do List</label>
                    <select
                      style="width: 100%;"
                      .value=${this._selectedTodoEntity || ""}
                      @change=${(ev: Event) => {
                        const target = ev.target as HTMLSelectElement;
                        this._selectedTodoEntity = target.value;
                      }}
                    >
                      <option value="">-- Select a to-do list --</option>
                      ${this._todoEntities.map(
                        (entity) => html`
                          <option value=${entity.entity_id}>${entity.name}</option>
                        `,
                      )}
                    </select>
                  </div>
                  <div>
                    <label class="form-label">Status Filter (optional)</label>
                    <select
                      style="width: 100%;"
                      .value=${this._importStatusFilter}
                      @change=${(ev: Event) => {
                        const target = ev.target as HTMLSelectElement;
                        this._importStatusFilter = target.value;
                      }}
                    >
                      <option value="">All items</option>
                      <option value="needs_action">Not completed</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                `}
          </div>
          <div class="import-dialog-actions">
            <button class="secondary small" @click=${this._cancelImport}>Cancel</button>
            <button
              class="primary small"
              @click=${() => this._handleImport()}
              ?disabled=${!this._selectedTodoEntity}
            >
              Import
            </button>
          </div>
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
