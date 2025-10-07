import { openDB } from "idb";
import type { LocalTask } from "@/types/task";

export function useTasksIndexDb() {
  const databasePromise = openDB("tasks-db", 1, {
    upgrade(database) {
      const store = database.createObjectStore("tasks", { keyPath: "id" });
      store.createIndex("isAccepted", "isAccepted");
    },
  });

  async function saveAll(tasks: LocalTask[]) {
    const database = await databasePromise;

    const transaction = database.transaction("tasks", "readwrite");
    for (const task of tasks) transaction.store.put(task);
    await transaction.done;
  }

  async function getAll(): Promise<LocalTask[]> {
    const database = await databasePromise;
    return database.getAll("tasks");
  }

  async function getAccepted(): Promise<LocalTask[]> {
    const database = await databasePromise;
    return database.getAllFromIndex(
      "tasks",
      "isAccepted",
      IDBKeyRange.only(true),
    );
  }

  async function setAccepted(id: string, accepted: boolean) {
    const database = await databasePromise;
    const task = await database.get("tasks", id);

    if (task) {
      task.isAccepted = accepted;
      await database.put("tasks", task);
    }
  }

  return { saveAll, getAll, getAccepted, setAccepted };
}
