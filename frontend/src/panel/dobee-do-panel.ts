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
  private _newColumnName = "";

  @state()
  private _unsubscribeUpdates: (() => void) | null = null;

  @state()
  private _selectedBoardId: string | null = null;

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
        padding: 16px;
      }

      h1 {
        margin-top: 0;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      li {
        padding: 8px 0;
      }

      .board-name {
        font-weight: 600;
      }

      .board-description {
        font-size: 0.9em;
        color: var(--secondary-text-color, #666);
      }

      .tasks-title {
        margin-top: 24px;
        font-weight: 600;
      }

      .task-item {
        padding: 4px 0;
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

  private async _handleCreateTask(): Promise<void> {
    if (!this.hass || !this._selectedBoardId || !this._newTaskTitle.trim()) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    const board = this._boards.find((b) => b.id === this._selectedBoardId);
    if (!board) {
      return;
    }

    const columnId = this._columns[0]?.id;
    if (!columnId) {
      // eslint-disable-next-line no-console
      console.warn("No column available on the selected board to create a task in.");
      return;
    }

    try {
      const newTask = await api.createTask(board.id, columnId, this._newTaskTitle.trim());
      this._newTaskTitle = "";

      // Optimistically update the task list if we are still on the same board.
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

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._unsubscribeUpdates) {
      this._unsubscribeUpdates();
      this._unsubscribeUpdates = null;
    }
  }

  protected render(): TemplateResult {
    const selectedBoard = this._boards.find((b) => b.id === this._selectedBoardId) ?? null;

    return html`
      <h1>DoBeeDo</h1>
      ${this._loading
        ? html`<p>Loading boards…</p>`
        : html`
            ${this._boards.length === 0
              ? html`<p>No boards available yet. Backend logic is still being implemented.</p>`
              : html`
                  <ul>
                    ${this._boards.map(
                      (board) => html`
                        <li
                          @click=${() => this._handleSelectBoard(board)}
                          style="cursor: pointer; ${
                            board.id === this._selectedBoardId ? "font-weight: 700;" : ""
                          }"
                        >
                          <div class="board-name">${board.name}</div>
                          ${board.description
                            ? html`<div class="board-description">
                                ${board.description}
                              </div>`
                            : ""}
                        </li>
                      `,
                    )}
                  </ul>

                  <div class="tasks-title">
                    Tasks on ${selectedBoard ? selectedBoard.name : "(no board selected)"}
                  </div>

                  <div style="margin-bottom: 16px;">
                    <input
                      type="text"
                      .value=${this._newColumnName}
                      placeholder="New column name"
                      @input=${(ev: Event) => {
                        const target = ev.target as HTMLInputElement;
                        this._newColumnName = target.value;
                      }}
                    />
                    <button
                      @click=${() => this._handleCreateColumn()}
                      ?disabled=${!this._newColumnName.trim() || !this._selectedBoardId}
                    >
                      Add column
                    </button>
                  </div>

                  <div style="display: flex; gap: 16px; align-items: flex-start;">
                    ${this._columns.length === 0
                      ? html`<p>No columns defined for this board yet.</p>`
                      : this._columns.map((col) => {
                          const tasksForColumn = this._tasks
                            .filter((task) => task.column_id === col.id)
                            .sort((a, b) => a.sort_index - b.sort_index);
                          return html`
                            <div>
                              <div class="board-name">${col.name}</div>
                              ${tasksForColumn.length === 0
                                ? html`<p>No tasks in this column.</p>`
                                : html`<ul>
                                    ${tasksForColumn.map(
                                      (task) => html`<li class="task-item">${task.title}</li>`,
                                    )}
                                  </ul>`}
                            </div>
                          `;
                        })}
                  </div>

                  <div style="margin-top: 16px;">
                    <input
                      type="text"
                      .value=${this._newTaskTitle}
                      placeholder="New task title"
                      @input=${(ev: Event) => {
                        const target = ev.target as HTMLInputElement;
                        this._newTaskTitle = target.value;
                      }}
                    />
                    <button @click=${() => this._handleCreateTask()} ?disabled=${
                      !this._newTaskTitle.trim() || this._loading || !this._selectedBoardId
                    }>
                      Add task
                    </button>
                  </div>
                `}
          `}
      <p>
        This is the early DoBeeDo panel. The full board view, columns, and task
        management UI will be added in later phases.
      </p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dobeedo-panel": DoBeeDoPanel;
  }
}
