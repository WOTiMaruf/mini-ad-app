import type { Task } from "../../shared/types/task"

export interface LocalTask extends Task {
  isAccepted?: boolean
}

export interface TaskFilter {
  search?: string
  sortBy?: 'date' | 'title' | 'rating' | 'urgency'
  sortOrder?: 'asc' | 'desc'
}
