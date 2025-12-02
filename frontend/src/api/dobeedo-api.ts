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

export interface HassConnection {
  sendMessagePromise<T = any>(msg: Record<string, any>): Promise<T>;
}

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
}

