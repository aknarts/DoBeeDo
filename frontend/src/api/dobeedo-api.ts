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
    // We use the low-level connection API here because the HA
    // connection helpers are not available in this standalone client.
    // The connection will route incoming messages with
    // `type: "dobeedo/event"` to the provided callback.

    // Send the subscribe command; we intentionally ignore the
    // promise resolution here because the connection will deliver
    // events asynchronously.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.connection.sendMessagePromise({
      type: "dobeedo/subscribe_updates",
    });

    const handler = (msg: any) => {
      if (msg?.type === "dobeedo/event" && msg.event_type && msg.payload) {
        onEvent({
          event_type: msg.event_type,
          payload: msg.payload,
          raw_type: msg.raw_type,
        });
      }
    };

    // Home Assistant's connection attaches listeners via `subscribeMessage`.
    // In this minimal client we assume `connection.subscribeMessage` exists;
    // if not, this will be a no-op.
    const anyConn = this.connection as any;
    const unsubscribe = anyConn.subscribeMessage?.(handler) ?? (() => {});

    return () => {
      unsubscribe();
    };
  }
}
