import type { LocalTask, TaskFilter, TaskSortByKeys } from "@/types/task";
import { TASK_SEARCH_BY_KEYS } from "@/types/task";
import type { Task } from "#shared/types/task";

import { defineStore } from "pinia";
import { $fetch } from "ofetch";

import { useTasksIndexDb } from "@/composables/useTasksIndexDb";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as LocalTask[],

    db: useTasksIndexDb(),
    isPending: false,
    isInit: false,
    error: null as Error | null,

    filters: {
      search: "",
      sortBy: "title",
      sortOrder: "asc",
    } as TaskFilter,
  }),

  getters: {
    getTasks: (state): LocalTask[] => state.tasks,

    getAcceptedTasks: (state) => (): LocalTask[] =>
      state.tasks.filter((task) => task.isAccepted),
    getUnAcceptedTasks: (state) => (): LocalTask[] =>
      state.tasks.filter((task) => !task.isAccepted),

    getFilteredTasks:
      (state) =>
      (list?: LocalTask[]): LocalTask[] => {
        let data = [...state.tasks];
        if (list) data = list;

        if (state.filters.search) {
          const search = state.filters.search.toLowerCase();

          data = data.filter((task) =>
            TASK_SEARCH_BY_KEYS.some((key) =>
              task[key].toLowerCase().includes(search),
            ),
          );
        }

        if (state.filters.sortBy) {
          const order = state.filters.sortOrder === "desc" ? -1 : 1;

          data.sort((a, b) =>
            a[state.filters.sortBy!] > b[state.filters.sortBy!]
              ? order
              : -order,
          );
        }

        return data;
      },
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
        this.db.saveAll(tasks);
      } catch (error) {
        this.error = error as Error;
      } finally {
        this.tasks = await this.db.getAll();
        this.isPending = false;
      }
    },

    setSearchFilter(value: string) {
      this.filters.search = value;
    },

    setSortByFilter(value: TaskSortByKeys) {
      this.filters.sortBy = value;
    },

    toggleSortOrder() {
      this.filters.sortOrder =
        this.filters.sortOrder === "asc" ? "desc" : "asc";
    },

    resetFilters() {
      this.filters = {
        search: "",
        sortBy: "title",
        sortOrder: "asc",
      };
    },
  },
});
