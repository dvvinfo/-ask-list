import type { Task } from '@/types/task'

const STORAGE_KEY = 'vue-task-list'

export const storageService = {
  getTasks(): Task[] {
    const tasksJson = localStorage.getItem(STORAGE_KEY)
    return tasksJson ? JSON.parse(tasksJson) : []
  },

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  },

  clearTasks(): void {
    localStorage.removeItem(STORAGE_KEY)
  },
}
