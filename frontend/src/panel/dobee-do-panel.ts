import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { DoBeeDoBoardSummary } from "../api/dobeedo-api";
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
  private _loading = false;

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
    } catch (err) {
      // For now, just log to the console; later we can surface a toast or
      // in-panel error state.
      // eslint-disable-next-line no-console
      console.error("Failed to load DoBeeDo boards", err);
    } finally {
      this._loading = false;
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
