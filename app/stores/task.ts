import type { LocalTask } from "@/types/task";
import type { Task } from "#shared/types/task";

import { defineStore } from "pinia";
import { $fetch } from "ofetch";

import { useTasksIndexDb } from "@/composables/useTasksIndexDb";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as LocalTask[],
    isPending: false,
    isInit: false,
    error: null as Error | null,
    db: useTasksIndexDb(),
  }),

  getters: {
    getAcceptedTasks: (state) => (): LocalTask[] =>
      state.tasks.filter((task) => task.isAccepted),
    getUnAcceptedTasks: (state) => (): LocalTask[] =>
      state.tasks.filter((task) => !task.isAccepted),
    getTasks: (state): LocalTask[] => state.tasks,
  },

  actions: {
    async init() {
      if (this.isInit || this.isPending) return;

      this.tasks = await this.db.getAll();
      if (this.tasks.length) {
        this.isInit = true;
        return;
      }

      await this.fetchData();
    },

    async setTaskAccepted(id: string, isAccepted: boolean) {
      const task = this.tasks.find((t) => t.id === id);
      if (!task) return;

      await this.db.setTaskAccepted(id, isAccepted);
      task.isAccepted = isAccepted;
    },

    async deleteAll() {
      await this.db.deleteAll();
      this.tasks = [];
    },

    async fetchData() {
      this.isPending = true;

      try {
        const tasks = await $fetch<Task[]>("/api/tasks");
        const localTasks: LocalTask[] = tasks.map((task) => ({
          ...task,
          isAccepted: false,
        }));
        this.db.saveAll(localTasks);
      } catch (error) {
        this.error = error as Error;
      } finally {
        this.tasks = await this.db.getAll();
        this.isPending = false;
      }
    },
  },
});
