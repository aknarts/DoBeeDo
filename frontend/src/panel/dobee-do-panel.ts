import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { DoBeeDoBoardSummary, DoBeeDoTaskSummary } from "../api/dobeedo-api";
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
      // Whenever hass becomes available, fetch the list of boards from the
      // backend via the DoBeeDo WebSocket API.
      this._fetchBoards();
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
      this._tasks = [];

      if (this._boards.length > 0) {
        const firstBoard = this._boards[0];
        this._tasks = await api.getTasks(firstBoard.id);
      }
    } catch (err) {
      // For now, just log to the console; later we can surface a toast or
      // in-panel error state.
      // eslint-disable-next-line no-console
      console.error("Failed to load DoBeeDo data", err);
    } finally {
      this._loading = false;
    }
  }

  private async _handleCreateTask(): Promise<void> {
    if (!this.hass || this._boards.length === 0 || !this._newTaskTitle.trim()) {
      return;
    }

    const api = new DoBeeDoApiClient(this.hass.connection);
    const board = this._boards[0];

    // For now we assume the first column is the default target; later we can
    // surface real column selection once columns are exposed on the backend.
    const columnId = (board as any).column_ids?.[0];
    if (!columnId) {
      // eslint-disable-next-line no-console
      console.warn("No column available on the first board to create a task in.");
      return;
    }

    try {
      await api.createTask(board.id, columnId, this._newTaskTitle.trim());

      // Clear the input and refresh the task list.
      this._newTaskTitle = "";
      this._tasks = await api.getTasks(board.id);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to create DoBeeDo task", err);
    }
  }

  protected render(): TemplateResult {
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
                        <li>
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

                  <div class="tasks-title">Tasks on first board</div>

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
                      !this._newTaskTitle.trim() || this._loading
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
