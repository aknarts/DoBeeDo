import { describe, expect, it, vi } from "vitest";
import { DoBeeDoApiClient, type HassConnection, type DoBeeDoBoardSummary, type DoBeeDoTaskSummary } from "./dobeedo-api";

function createMockConnection<TResponse>(response: TResponse) {
  return {
    sendMessagePromise: vi.fn().mockResolvedValue(response),
  } as unknown as HassConnection;
}

describe("DoBeeDoApiClient", () => {
  it("getBoards should call dobeedo/get_boards and return boards", async () => {
    const boards: DoBeeDoBoardSummary[] = [
      { id: "board-1", name: "Board 1" },
    ];
    const conn = createMockConnection({ boards });
    const client = new DoBeeDoApiClient(conn);

    const result = await client.getBoards();

    expect(result).toEqual(boards);
    expect((conn.sendMessagePromise as any)).toHaveBeenCalledWith({
      type: "dobeedo/get_boards",
    });
  });

  it("updateTask should send the correct payload and return updated task", async () => {
    const updated: DoBeeDoTaskSummary = {
      id: "task-1",
      board_id: "board-1",
      column_id: "column-1",
      title: "Updated title",
      description: null,
      sort_index: 0,
    };

    const conn = createMockConnection({ task: updated });
    const client = new DoBeeDoApiClient(conn);

    const result = await client.updateTask("task-1", { title: "Updated title" });

    expect(result).toEqual(updated);
    expect((conn.sendMessagePromise as any)).toHaveBeenCalledWith({
      type: "dobeedo/update_task",
      task_id: "task-1",
      title: "Updated title",
    });
  });

  it("moveTask should send the correct payload and return moved task", async () => {
    const moved: DoBeeDoTaskSummary = {
      id: "task-1",
      board_id: "board-1",
      column_id: "column-2",
      title: "Title",
      description: null,
      sort_index: 1,
    };

    const conn = createMockConnection({ task: moved });
    const client = new DoBeeDoApiClient(conn);

    const result = await client.moveTask("task-1", "column-2", 1);

    expect(result).toEqual(moved);
    expect((conn.sendMessagePromise as any)).toHaveBeenCalledWith({
      type: "dobeedo/move_task",
      task_id: "task-1",
      target_column_id: "column-2",
      target_sort_index: 1,
    });
  });
});
