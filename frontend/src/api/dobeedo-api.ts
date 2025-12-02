// Minimal DoBeeDo frontend API client.
//
// This client wraps the Home Assistant WebSocket connection and provides
// typed helper methods for calling DoBeeDo commands. For now it only includes
// a stubbed `getBoards` call that matches the placeholder backend API.

export interface DoBeeDoBoardSummary {
  id: string;
  name: string;
  description?: string;
}

export interface DoBeeDoTaskSummary {
  id: string;
  board_id: string;
  column_id: string;
  title: string;
  description?: string | null;
  sort_index: number;
}

export interface HassConnection {
  sendMessagePromise<T = any>(msg: Record<string, any>): Promise<T>;
  // Allow access to the low-level subscription hook used by HA frontend
  subscribeEvents?: (callback: (msg: any) => void) => () => void;
}

export type DoBeeDoEventMessage = {
  event_type: string;
  payload: Record<string, any>;
  raw_type?: string;
};

export class DoBeeDoApiClient {
  private connection: HassConnection;

  constructor(connection: HassConnection) {
    this.connection = connection;
  }

  async getBoards(): Promise<DoBeeDoBoardSummary[]> {
    // The Home Assistant WebSocket API requires a unique ID, but the core
    // helpers (e.g. `connection.sendMessagePromise`) will inject this for us
    // if not provided. We only need to provide the `type` string.
    const response = await this.connection.sendMessagePromise<{
      boards: DoBeeDoBoardSummary[];
    }>({
      type: "dobeedo/get_boards",
    });

    return response.boards ?? [];
  }

  public async getTasks(boardId: string): Promise<DoBeeDoTaskSummary[]> {
    const response = await this.connection.sendMessagePromise<{
      tasks?: DoBeeDoTaskSummary[];
    }>({
      type: "dobeedo/get_tasks",
      board_id: boardId,
    });

    return response.tasks ?? [];
  }

  public async createTask(
    boardId: string,
    columnId: string,
    title: string,
    description?: string,
  ): Promise<DoBeeDoTaskSummary> {
    const response = await this.connection.sendMessagePromise<{
      task: DoBeeDoTaskSummary;
    }>({
      type: "dobeedo/create_task",
      board_id: boardId,
      column_id: columnId,
      title,
      description,
    });

    return response.task;
  }

  public subscribeUpdates(
    onEvent: (event: DoBeeDoEventMessage) => void,
  ): () => void {
    const anyConn = this.connection as any;

    // Prefer a generic subscribeEvents hook if available; otherwise, fall
    // back to subscribeMessage if present.
    if (anyConn.subscribeEvents) {
      // eslint-disable-next-line no-console
      console.debug("DoBeeDo: using connection.subscribeEvents for updates");
      const unsubscribe = anyConn.subscribeEvents((msg: any) => {
        // eslint-disable-next-line no-console
        console.debug("DoBeeDo: raw WS message via subscribeEvents", msg);
        if (msg?.type === "dobeedo/event" && msg.event_type && msg.payload) {
          onEvent({
            event_type: msg.event_type,
            payload: msg.payload,
            raw_type: msg.raw_type,
          });
        }
      });
      return () => {
        // eslint-disable-next-line no-console
        console.debug("DoBeeDo: unsubscribe from subscribeEvents");
        unsubscribe();
      };
    }

    if (!anyConn.subscribeMessage) {
      // eslint-disable-next-line no-console
      console.warn("DoBeeDo: connection.subscribeMessage/subscribeEvents not available");
      return () => {};
    }

    const handler = (msg: any) => {
      // eslint-disable-next-line no-console
      console.debug("DoBeeDo: raw WS message in subscribeUpdates handler", msg);
      if (msg?.type === "dobeedo/event" && msg.event_type && msg.payload) {
        onEvent({
          event_type: msg.event_type,
          payload: msg.payload,
          raw_type: msg.raw_type,
        });
      }
    };

    // eslint-disable-next-line no-console
    console.debug("DoBeeDo: calling connection.subscribeMessage for subscribe_updates");
    const unsubscribe = anyConn.subscribeMessage(handler, {
      type: "dobeedo/subscribe_updates",
    });

    return () => {
      // eslint-disable-next-line no-console
      console.debug("DoBeeDo: unsubscribe from subscribe_updates");
      unsubscribe();
    };
  }
}
