import type { Task, TaskFilter } from '@/types/task'
import { taskApi } from '@/api/taskApi'

interface TaskState {
  tasks: Task[]
  loading: boolean
  error: string | null
  filter: TaskFilter
}

const taskModule = {
  namespaced: true,

  state: (): TaskState => ({
    tasks: [],
    loading: false,
    error: null,
    filter: 'all',
  }),

  mutations: {
    SET_TASKS(state: TaskState, tasks: Task[]) {
      state.tasks = tasks
    },
    ADD_TASK(state: TaskState, task: Task) {
      state.tasks.push(task)
    },
    UPDATE_TASK(state: TaskState, updatedTask: Task) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask)
      }
    },
    DELETE_TASK(state: TaskState, taskId: number) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId)
    },
    SET_LOADING(state: TaskState, loading: boolean) {
      state.loading = loading
    },
    SET_ERROR(state: TaskState, error: string | null) {
      state.error = error
    },
    SET_FILTER(state: TaskState, filter: TaskFilter) {
      state.filter = filter
    },
  },

  actions: {
    async fetchTasks({ commit }: { commit: (type: string, payload?: unknown) => void }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const tasks = await taskApi.getTasks()
        commit('SET_TASKS', tasks)
      } catch (error) {
        commit('SET_ERROR', 'Ошибка при загрузке задач')
        console.error('Error fetching tasks:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async addTask(
      { commit }: { commit: (type: string, payload?: unknown) => void },
      title: string,
    ) {
      if (!title.trim()) return

      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const newTask = await taskApi.addTask(title)
        commit('ADD_TASK', newTask)
      } catch (error) {
        commit('SET_ERROR', 'Ошибка при добавлении задачи')
        console.error('Error adding task:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async toggleTask(
      { commit, state }: { commit: (type: string, payload?: unknown) => void; state: TaskState },
      taskId: number,
    ) {
      commit('SET_ERROR', null)
      try {
        const task = state.tasks.find((t) => t.id === taskId)
        if (!task) return

        commit('UPDATE_TASK', { ...task, completed: !task.completed })

        await taskApi.toggleTask(taskId)
      } catch (error) {
        const task = state.tasks.find((t) => t.id === taskId)
        if (task) {
          commit('UPDATE_TASK', { ...task, completed: !task.completed })
        }
        commit('SET_ERROR', 'Ошибка при обновлении задачи')
        console.error('Error toggling task:', error)
      }
    },

    async deleteTask(
      { commit }: { commit: (type: string, payload?: unknown) => void },
      taskId: number,
    ) {
      commit('SET_ERROR', null)
      try {
        await taskApi.deleteTask(taskId)
        commit('DELETE_TASK', taskId)
      } catch (error) {
        commit('SET_ERROR', 'Ошибка при удалении задачи')
        console.error('Error deleting task:', error)
      }
    },

    setFilter(
      { commit }: { commit: (type: string, payload?: unknown) => void },
      filter: TaskFilter,
    ) {
      commit('SET_FILTER', filter)
    },
  },

  getters: {
    filteredTasks: (state: TaskState) => {
      switch (state.filter) {
        case 'active':
          return state.tasks.filter((task) => !task.completed)
        case 'completed':
          return state.tasks.filter((task) => task.completed)
        default:
          return state.tasks
      }
    },

    activeTasksCount: (state: TaskState) => {
      return state.tasks.filter((task) => !task.completed).length
    },

    completedTasksCount: (state: TaskState) => {
      return state.tasks.filter((task) => task.completed).length
    },

    totalTasksCount: (state: TaskState) => {
      return state.tasks.length
    },
  },
}

export { taskModule }
