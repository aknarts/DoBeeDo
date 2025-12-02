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
    const anyConn = this.connection as any;
    if (!anyConn.subscribeMessage) {
      // If the connection does not support subscribeMessage, we cannot
      // receive pushed events; return a no-op unsubscribe.
      return () => {};
    }

    const handler = (msg: any) => {
      if (msg?.type === "dobeedo/event" && msg.event_type && msg.payload) {
        onEvent({
          event_type: msg.event_type,
          payload: msg.payload,
          raw_type: msg.raw_type,
        });
      }
    };

    // Use Home Assistant's standard pattern: subscribeMessage both sends
    // the subscribe command and routes matching responses to the handler.
    const unsubscribe = anyConn.subscribeMessage(handler, {
      type: "dobeedo/subscribe_updates",
    });

    return () => {
      unsubscribe();
    };
  }
}
