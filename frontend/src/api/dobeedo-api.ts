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

export interface DoBeeDoColumnSummary {
  id: string;
  board_id: string;
  name: string;
  order_index: number;
}

export interface DoBeeDoTaskSummary {
  id: string;
  board_id: string;
  column_id: string;
  title: string;
  description?: string | null;
  sort_index: number;
  due_date?: string | null;
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

  public async createBoard(name: string, description?: string): Promise<DoBeeDoBoardSummary> {
    const payload: Record<string, any> = {
      type: "dobeedo/create_board",
      name,
    };

    if (description !== undefined) {
      payload.description = description;
    }

    const response = await this.connection.sendMessagePromise<{
      board: DoBeeDoBoardSummary;
    }>(payload);

    return response.board;
  }

  public async getColumns(boardId: string): Promise<DoBeeDoColumnSummary[]> {
    const response = await this.connection.sendMessagePromise<{
      columns?: DoBeeDoColumnSummary[];
    }>({
      type: "dobeedo/get_columns",
      board_id: boardId,
    });

    return response.columns ?? [];
  }

  public async createColumn(
    boardId: string,
    name: string,
    orderIndex?: number,
  ): Promise<DoBeeDoColumnSummary> {
    const response = await this.connection.sendMessagePromise<{
      column: DoBeeDoColumnSummary;
    }>({
      type: "dobeedo/create_column",
      board_id: boardId,
      name,
      order_index: orderIndex,
    });

    return response.column;
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
    dueDate?: string,
  ): Promise<DoBeeDoTaskSummary> {
    const payload: Record<string, any> = {
      type: "dobeedo/create_task",
      board_id: boardId,
      column_id: columnId,
      title,
    };

    if (description !== undefined) {
      payload.description = description;
    }
    if (dueDate !== undefined) {
      payload.due_date = dueDate;
    }

    const response = await this.connection.sendMessagePromise<{
      task: DoBeeDoTaskSummary;
    }>(payload);

    return response.task;
  }

  public async updateTask(
    taskId: string,
    updates: { title?: string; description?: string | null; due_date?: string | null },
  ): Promise<DoBeeDoTaskSummary> {
    const payload: Record<string, any> = {
      type: "dobeedo/update_task",
      task_id: taskId,
    };

    if (updates.title !== undefined) {
      payload.title = updates.title;
    }
    if (updates.description !== undefined) {
      payload.description = updates.description;
    }
    if (updates.due_date !== undefined) {
      payload.due_date = updates.due_date;
    }

    const response = await this.connection.sendMessagePromise<{
      task: DoBeeDoTaskSummary;
    }>(payload);

    return response.task;
  }

  public async moveTask(
    taskId: string,
    targetColumnId: string,
    targetSortIndex?: number,
  ): Promise<DoBeeDoTaskSummary> {
    const payload: Record<string, any> = {
      type: "dobeedo/move_task",
      task_id: taskId,
      target_column_id: targetColumnId,
    };

    if (targetSortIndex !== undefined) {
      payload.target_sort_index = targetSortIndex;
    }

    const response = await this.connection.sendMessagePromise<{
      task: DoBeeDoTaskSummary;
    }>(payload);

    return response.task;
  }

  public async deleteTask(taskId: string): Promise<void> {
    await this.connection.sendMessagePromise<{ success: boolean }>({
      type: "dobeedo/delete_task",
      task_id: taskId,
    });
  }

  public async deleteColumn(columnId: string): Promise<void> {
    await this.connection.sendMessagePromise<{ success: boolean }>({
      type: "dobeedo/delete_column",
      column_id: columnId,
    });
  }

  public async deleteBoard(boardId: string): Promise<void> {
    await this.connection.sendMessagePromise<{ success: boolean }>({
      type: "dobeedo/delete_board",
      board_id: boardId,
    });
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

        // Shape 1: Home Assistant event-bus packet
        if (typeof msg?.event_type === "string" && msg.data) {
          const et: string = msg.event_type;
          if (et.startsWith("dobeedo_")) {
            // e.g. "dobeedo_task_created" -> "task_created"
            const simplified = et.replace(/^dobeedo_/, "");
            onEvent({
              event_type: simplified,
              payload: msg.data as Record<string, any>,
              raw_type: et,
            });
          }
          return;
        }

        // Shape 2: explicit dobeedo/event envelope (if ever routed here)
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
