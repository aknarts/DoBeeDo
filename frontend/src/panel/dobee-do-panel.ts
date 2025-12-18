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
  private _movingTaskId: string | null = null;

  @state()
  private _draggingTaskId: string | null = null;

  @state()
  private _dragOverColumnId: string | null = null;

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

      select option {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        padding: 8px;
      }

      /* Board tabs selector */
      .board-tabs {
        display: flex;
        margin-bottom: 24px;
        border-bottom: 2px solid var(--divider-color);
        overflow-x: auto;
        scrollbar-width: thin;
      }

      .board-tab {
        position: relative;
        padding: 12px 20px;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        margin-bottom: -2px;
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
        background: var(--state-icon-hover-color);
      }

      .board-tab.selected {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
        background: var(--primary-background-color);
        font-weight: 600;
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

      /* Columns layout */
      .columns-container {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        padding-bottom: 16px;
      }

      .column {
        flex: 0 0 300px;
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: var(--ha-card-border-radius, 8px);
        padding: 16px;
        box-shadow: var(--ha-card-box-shadow);
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
        background: var(--secondary-background-color);
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
        background: var(--secondary-background-color);
        border: 1px solid var(--divider-color);
        border-left: 3px solid var(--divider-color);
        border-radius: 6px;
        padding: 12px;
        cursor: grab;
        transition: all 0.2s ease;
        box-shadow: var(--ha-card-box-shadow, none);
      }

      .task-card:hover {
        border-left-color: var(--primary-color);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }

      .task-card.dragging {
        opacity: 0.5;
        cursor: grabbing;
        transform: rotate(2deg);
      }

      .column.drag-over {
        background: var(--primary-color);
        opacity: 0.1;
      }

      .tasks-list.drag-over {
        background: var(--primary-color);
        opacity: 0.2;
        border-radius: 4px;
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
        background: var(--card-background-color);
        border: 2px dashed var(--divider-color);
        opacity: 0.6;
        min-height: 60px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        transition: opacity 0.2s ease, border-color 0.2s ease;
      }

      .add-column-mock:hover {
        opacity: 1;
        border-color: var(--primary-color);
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

    if (!this.hass || !this._selectedBoardId || !title.trim()) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    const board = this._boards.find((b) => b.id === this._selectedBoardId);
    if (!board) {
      return;
    }

    try {
      await api.createTask(
        board.id,
        columnId,
        title.trim(),
        description.trim() || undefined,
        dueDate.trim() || undefined,
      );
      // Clear input for this column
      delete this._newTaskTitles[columnId];
      delete this._newTaskDescriptions[columnId];
      delete this._newTaskDueDates[columnId];
      this._newTaskTitles = { ...this._newTaskTitles };
      this._newTaskDescriptions = { ...this._newTaskDescriptions };
      this._newTaskDueDates = { ...this._newTaskDueDates };

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
  }

  private _cancelEditTask(): void {
    this._editingTaskId = null;
    this._editTaskTitle = "";
    this._editTaskDescription = "";
    this._editTaskDueDate = "";
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

    const updates: { title?: string; description?: string | null; due_date?: string | null } = {};

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

    if (!updates.title && updates.description === undefined && updates.due_date === undefined) {
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
      await api.moveTask(task.id, targetColumnId);
      this._cancelMoveTask();
      // WebSocket event will refresh the task automatically
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to move DoBeeDo task", err);
    }
  }

  private _handleDragStart(task: DoBeeDoTaskSummary, ev: DragEvent): void {
    this._draggingTaskId = task.id;
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.setData("text/plain", task.id);
    }
  }

  private _handleDragEnd(): void {
    this._draggingTaskId = null;
    this._dragOverColumnId = null;
  }

  private _handleDragOver(ev: DragEvent): void {
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = "move";
    }
  }

  private _handleDragEnterColumn(columnId: string): void {
    this._dragOverColumnId = columnId;
  }

  private _handleDragLeaveColumn(): void {
    this._dragOverColumnId = null;
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
    this._dragOverColumnId = null;

    if (!this._draggingTaskId || !this.hass) {
      return;
    }

    const task = this._tasks.find((t) => t.id === this._draggingTaskId);
    if (!task) {
      this._draggingTaskId = null;
      return;
    }

    // Calculate target sort index based on drop position
    const tasksInColumn = this._tasks
      .filter((t) => t.column_id === columnId && t.id !== this._draggingTaskId)
      .sort((a, b) => a.sort_index - b.sort_index);

    let targetIndex = tasksInColumn.length; // Default to end

    // Find the task element we're hovering over
    const tasksListEl = (ev.currentTarget as HTMLElement).querySelector(".tasks-list");
    if (tasksListEl) {
      const taskElements = Array.from(tasksListEl.querySelectorAll(".task-card:not(.dragging)"));
      const mouseY = ev.clientY;

      for (let i = 0; i < taskElements.length; i++) {
        const rect = taskElements[i].getBoundingClientRect();
        const middle = rect.top + rect.height / 2;

        if (mouseY < middle) {
          targetIndex = i;
          break;
        }
      }
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    try {
      await api.moveTask(task.id, columnId, targetIndex);
      this._draggingTaskId = null;
      // WebSocket event will refresh the task automatically
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to move task via drag-and-drop", err);
      this._draggingTaskId = null;
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

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._unsubscribeUpdates) {
      this._unsubscribeUpdates();
      this._unsubscribeUpdates = null;
    }
  }

  protected render(): TemplateResult {
    return html`
      <h1>DoBeeDo</h1>
      ${this._loading ? html`<p>Loading boards…</p>` : this._renderContent()}
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
      ${this._selectedBoardId ? this._renderBoard() : html`<p>Select a board to begin</p>`}
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
    return html`
      ${this._columns.length === 0
        ? html`<div class="empty-state">No columns yet. Add a column to get started!</div>`
        : ""}
      <div class="columns-container">
        ${this._columns.map((col) => this._renderColumn(col))}
        ${this._renderAddColumnMock()}
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

    const isDragOver = this._dragOverColumnId === column.id;

    return html`
      <div
        class="column ${isDragOver ? "drag-over" : ""}"
        @dragover=${this._handleDragOver}
        @dragenter=${() => this._handleDragEnterColumn(column.id)}
        @dragleave=${this._handleDragLeaveColumn}
        @drop=${(ev: DragEvent) => this._handleDrop(column.id, ev)}
      >
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
        <div class="tasks-list ${isDragOver ? "drag-over" : ""}">
          ${tasksForColumn.length === 0
            ? html`<div class="empty-state" style="padding: 16px; font-size: 13px;">
                No tasks yet
              </div>`
            : tasksForColumn.map((task) => this._renderTask(task))}
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
                        this._newTaskTitles = { ...this._newTaskTitles };
                        this._newTaskDescriptions = { ...this._newTaskDescriptions };
                        this._newTaskDueDates = { ...this._newTaskDueDates };
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

    const isDragging = this._draggingTaskId === task.id;
    const isOverdue = this._isTaskOverdue(task);

    return html`
      <div
        class="task-card ${isDragging ? "dragging" : ""} ${isOverdue ? "overdue" : ""}"
        draggable="true"
        @dragstart=${(ev: DragEvent) => this._handleDragStart(task, ev)}
        @dragend=${this._handleDragEnd}
      >
        <div class="task-title">${task.title}</div>
        ${task.description ? html`<div class="task-description">${task.description}</div>` : ""}
        ${task.due_date
          ? html`<div class="task-due-date ${isOverdue ? "overdue" : ""}">
              📅 ${this._formatDueDate(task.due_date)}
            </div>`
          : ""}
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
