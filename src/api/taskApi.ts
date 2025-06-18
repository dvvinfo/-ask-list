import type { Task } from '@/types/task'
import { storageService } from './storageService'

// Эмуляция задержки сети
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Получаем начальные задачи из localStorage или используем дефолтные
let tasks = storageService.getTasks()
if (tasks.length === 0) {
  tasks = [
    { id: 1, title: 'Изучить Vue 3', completed: true },
    { id: 2, title: 'Изучить Vuex 4', completed: false },
    { id: 3, title: 'Изучить TypeScript', completed: false },
  ]
  storageService.saveTasks(tasks)
}

let nextId = Math.max(...tasks.map((task) => task.id), 0) + 1

export const taskApi = {
  // Получение всех задач
  async getTasks(): Promise<Task[]> {
    await delay(500)
    return [...tasks]
  },

  // Добавление новой задачи
  async addTask(title: string): Promise<Task> {
    await delay(300)
    const newTask: Task = {
      id: nextId++,
      title: title.trim(),
      completed: false,
    }
    tasks.push(newTask)
    storageService.saveTasks(tasks)
    return newTask
  },

  // Обновление задачи
  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    await delay(200)
    const taskIndex = tasks.findIndex((task) => task.id === id)
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updates }
    storageService.saveTasks(tasks)
    return tasks[taskIndex]
  },

  // Удаление задачи
  async deleteTask(id: number): Promise<void> {
    await delay(200)
    const taskIndex = tasks.findIndex((task) => task.id === id)
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }

    tasks.splice(taskIndex, 1)
    storageService.saveTasks(tasks)
  },

  // Переключение статуса задачи
  async toggleTask(id: number): Promise<Task> {
    await delay(200)
    const taskIndex = tasks.findIndex((task) => task.id === id)
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }

    tasks[taskIndex].completed = !tasks[taskIndex].completed
    storageService.saveTasks(tasks)
    return tasks[taskIndex]
  },
}
