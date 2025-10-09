import type { Task } from "#shared/types/task";
import type { BadgeProps } from "@nuxt/ui";

export const TASK_SEARCH_BY_KEYS: TaskSearchByKeys[] = [
  "title",
  "location",
  "name",
  "workplace",
];

export const RATING_COLORS = {
  1: "error",
  2: "warning",
  3: "primary",
  4: "info",
  5: "success",
} as const satisfies Record<RatingLevel, BadgeProps["color"]>;

export const URGENCY_COLORS = {
  1: "success",
  2: "info",
  3: "primary",
  4: "warning",
  5: "error",
} as const satisfies Record<UrgencyLevel, BadgeProps["color"]>;

export type TaskSortByKeys = Exclude<keyof Task, "id" | "avatar">;
export type TaskSearchByKeys = keyof Pick<
  Task,
  "title" | "location" | "name" | "workplace"
>;

export interface TaskFilter {
  search?: string;
  sortBy?: TaskSortByKeys;
  sortOrder?: "asc" | "desc";
}

export interface LocalTask extends Task {
  isAccepted: boolean;
}
