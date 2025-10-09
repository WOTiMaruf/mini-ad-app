import { openDB } from "idb";
import type { LocalTask } from "@/types/task";

export function useTasksIndexDb() {
  const databasePromise = openDB("tasks-db", 1, {
    upgrade(database) {
      const store = database.createObjectStore("tasks", { keyPath: "id" });
      store.createIndex("isAccepted", "isAccepted", { unique: false });
    },
  });

  async function saveAll(tasks: LocalTask[]) {
    const database = await databasePromise;
    const transaction = database.transaction("tasks", "readwrite");

    for (const task of tasks)
      transaction.store.put({
        ...task,
        isAccepted: task.isAccepted.toString() ?? "false",
      });
    await transaction.done;
  }

  async function deleteAll(): Promise<void> {
    const database = await databasePromise;
    const transaction = database.transaction("tasks", "readwrite");

    await transaction.store.clear();
    await transaction.done;
  }

  async function getAll(): Promise<LocalTask[]> {
    const database = await databasePromise;
    return database.getAll("tasks");
  }

  async function getTasksByAccepted(isAccepted: boolean): Promise<LocalTask[]> {
    const database = await databasePromise;
    const transaction = database.transaction("tasks", "readonly");

    const index = transaction.store.index("isAccepted");
    return index.getAll(isAccepted.toString());
  }

  async function setTaskAccepted(id: string, isAccepted: boolean) {
    const database = await databasePromise;
    const transaction = database.transaction("tasks", "readwrite");

    const task = await transaction.store.get(id);
    if (task) {
      task.isAccepted = isAccepted.toString();
      await transaction.store.put(task);
    }

    await transaction.done;
  }

  return { saveAll, getAll, deleteAll, getTasksByAccepted, setTaskAccepted };
}
