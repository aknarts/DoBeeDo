import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { DoBeeDoBoardSummary, DoBeeDoTaskSummary, DoBeeDoEventMessage } from "../api/dobeedo-api";
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
  private _loading = false;

  @state()
  private _newTaskTitle = "";

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
        this._unsubscribeUpdates = api.subscribeUpdates((evt: DoBeeDoEventMessage) => {
          if (evt.event_type.startsWith("task_")) {
            void this._refreshTasksForSelectedBoard();
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

      await this._refreshTasksForSelectedBoard();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to load DoBeeDo data", err);
    } finally {
      this._loading = false;
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
    void this._refreshTasksForSelectedBoard();
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

    const columnId = (board as any).column_ids?.[0];
    if (!columnId) {
      // eslint-disable-next-line no-console
      console.warn("No column available on the selected board to create a task in.");
      return;
    }

    try {
      await api.createTask(board.id, columnId, this._newTaskTitle.trim());
      this._newTaskTitle = "";
      await this._refreshTasksForSelectedBoard();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to create DoBeeDo task", err);
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

                  <div>
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

                  ${this._tasks.length === 0
                    ? html`<p>No tasks yet.</p>`
                    : html`
                        <ul>
                          ${this._tasks.map(
                            (task) => html`<li class="task-item">${task.title}</li>`,
                          )}
                        </ul>
                      `}
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
