<template>
  <div class="task-item" :class="{ completed: isCompleted }">
    <div class="task-content">
      <BaseCheckbox :modelValue="isCompleted" @update:modelValue="handleToggle" />
      <span class="task-title">{{ task.title }}</span>
    </div>
    <BaseButton @click="deleteTask" variant="danger" size="small" title="Удалить задачу">
      ✕
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types/task'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { BaseCheckbox, BaseButton } from './ui'

interface Props {
  task: Task
}

const props = defineProps<Props>()
const store = useStore()

const isCompleted = computed(() => props.task.completed)

const handleToggle = async () => {
  await store.dispatch('task/toggleTask', props.task.id)
}

const deleteTask = () => {
  store.dispatch('task/deleteTask', props.task.id)
}
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: var(--spacing-sm);
  transition: all 0.2s ease;
}

.task-item:hover {
  box-shadow: var(--shadow-light);
}

.task-item.completed {
  opacity: 0.7;
  background: var(--color-light);
}

.task-content {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: var(--spacing-sm);
}

.task-title {
  font-size: 16px;
  color: var(--color-text);
  word-break: break-word;
  margin: 0;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: var(--color-text-muted);
}

@media (max-width: 480px) {
  .task-item {
    padding: var(--spacing-xs) var(--spacing-sm);
    margin-bottom: var(--spacing-xs);
    min-height: 32px;
  }

  .task-content {
    gap: var(--spacing-xs);
  }

  .task-title {
    font-size: 12px;
  }

  .task-item :deep(.base-checkbox__checkmark) {
    height: 14px;
    width: 14px;
  }

  .task-item :deep(.base-checkbox__input:checked ~ .base-checkbox__checkmark:after) {
    left: 4px;
    top: 1px;
    width: 3px;
    height: 7px;
    border-width: 0 1px 1px 0;
  }

  .task-item :deep(.base-button) {
    padding: var(--spacing-xs);
    height: 24px;
    width: 24px;
    min-width: 24px;
    font-size: 10px;
  }
}
</style>
