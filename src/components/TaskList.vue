<template>
  <div class="task-list">
    <AddTask />
    <TaskFilters />

    <div v-if="loading" class="loading">Загрузка задач...</div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="filteredTasks.length === 0" class="empty-state">
      <p v-if="currentFilter === 'all'">Нет задач. Добавьте первую задачу!</p>
      <p v-else-if="currentFilter === 'active'">Нет активных задач.</p>
      <p v-else>Нет выполненных задач.</p>
    </div>

    <div v-else class="tasks-container">
      <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AddTask from './AddTask.vue'
import TaskFilters from './TaskFilters.vue'
import TaskItem from './TaskItem.vue'

const store = useStore()

const loading = computed(() => store.state.task.loading)
const error = computed(() => store.state.task.error)
const currentFilter = computed(() => store.state.task.filter)

// Use the Vuex getter instead of local filtering
const filteredTasks = computed(() => store.getters['task/filteredTasks'])

onMounted(() => {
  store.dispatch('task/fetchTasks')
})
</script>

<style scoped>
.task-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: var(--color-empty-text);
  font-size: 16px;
  background: var(--color-empty-background);
  border-radius: 8px;
  backdrop-filter: blur(4px);
}

.error {
  text-align: center;
  padding: 20px;
  background: var(--color-error-bg);
  color: var(--color-error-text);
  border: 1px solid var(--color-error-border);
  border-radius: 8px;
  margin-bottom: 20px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--color-empty-text);
  font-size: 16px;
  background: var(--color-empty-background);
  border-radius: 8px;
  backdrop-filter: blur(4px);
}

.tasks-container {
  min-height: 100px;
}

@media (max-width: 480px) {
  .loading,
  .empty-state {
    padding: var(--spacing-lg);
    font-size: 12px;
  }
}
</style>
