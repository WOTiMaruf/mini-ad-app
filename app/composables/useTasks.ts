import { useTasksIndexDb } from "@/composables/useTasksIndexDb";
import type { Task } from "#shared/types/task";
import type { LocalTask } from "@/types/task";

export function useTasks() {
  const taskDataBase = useTasksIndexDb();

  const taskMap = shallowRef<Map<string, LocalTask>>(new Map());

  const { data, pending, error, refresh } = useFetch<Task[]>("/api/tasks", {
    async onResponse({ response }) {
      const serverTasks = (response._data as Task[]).map((task) => ({
        ...task,
        isAccepted: false,
      })) as LocalTask[];

      data.value = serverTasks;
      taskMap.value = new Map(serverTasks.map((task) => [task.id, task]));

      await taskDataBase.saveAll(serverTasks);
    },

    async onRequestError() {
      const cachedTasks = await taskDataBase.getAll();

      data.value = cachedTasks;
      taskMap.value = new Map(cachedTasks.map((task) => [task.id, task]));
    },
  });

  async function setAcceptedTask(id: string) {
    const task = taskMap.value.get(id);

    if (task) {
      task.isAccepted = true;
      await taskDataBase.setAccepted(id, true);
    }
  }

  async function getAcceptedTasks() {
    return await taskDataBase.getAccepted();
  }

  return {
    taskMap: readonly(taskMap.value),
    pending,
    error,
    refresh,
    setAcceptedTask,
    getAcceptedTasks,
  };
}
