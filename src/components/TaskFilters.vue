<template>
  <div class="task-filters">
    <div class="filter-buttons">
      <BaseButton
        @click="setFilter('all')"
        variant="ghost"
        :class="{ active: currentFilter === 'all' }"
      >
        Все ({{ totalCount }})
      </BaseButton>
      <BaseButton
        @click="setFilter('active')"
        variant="ghost"
        :class="{ active: currentFilter === 'active' }"
      >
        Активные ({{ activeCount }})
      </BaseButton>
      <BaseButton
        @click="setFilter('completed')"
        variant="ghost"
        :class="{ active: currentFilter === 'completed' }"
      >
        Выполненные ({{ completedCount }})
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { Task, TaskFilter } from '@/types/task'
import { BaseButton } from './ui'

const store = useStore()

const currentFilter = computed(() => store.state.task.filter)

// Получаем счетчики напрямую из состояния
const allTasks = computed(() => store.state.task.tasks)
const totalCount = computed(() => allTasks.value.length)
const activeCount = computed(() => allTasks.value.filter((task: Task) => !task.completed).length)
const completedCount = computed(() => allTasks.value.filter((task: Task) => task.completed).length)

const setFilter = (filter: TaskFilter) => {
  store.dispatch('task/setFilter', filter)
}
</script>

<style scoped>
.task-filters {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.filter-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-count {
  font-size: 14px;
  opacity: 0.8;
}

@media (max-width: 480px) {
  .task-filters {
    gap: var(--spacing-xs);
    justify-content: center;
    margin-bottom: var(--spacing-lg);
  }

  .task-filters :deep(button) {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 12px;
  }

  .filter-count {
    font-size: 12px;
  }
}
</style>
