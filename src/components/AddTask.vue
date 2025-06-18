<template>
  <div class="add-task">
    <div class="input-group">
      <BaseInput
        v-model="newTaskTitle"
        placeholder="Добавить новую задачу..."
        :disabled="loading"
        @enter="addTask"
      />
      <BaseButton @click="addTask" :disabled="loading || !newTaskTitle.trim()" size="large">
        {{ loading ? 'Добавление...' : 'Добавить' }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { BaseInput, BaseButton } from './ui'

const store = useStore()
const newTaskTitle = ref('')

const loading = computed(() => store.state.task.loading)

const addTask = async () => {
  if (!newTaskTitle.value.trim() || loading.value) return

  await store.dispatch('task/addTask', newTaskTitle.value)
  newTaskTitle.value = ''
}
</script>

<style scoped>
.add-task {
  margin-bottom: var(--spacing-xl);
}

.input-group {
  display: flex;
  gap: var(--spacing-md);
}

@media (max-width: 480px) {
  .add-task {
    margin-bottom: var(--spacing-lg);
  }

  .input-group {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .input-group :deep(input) {
    width: 100%;
    padding: var(--spacing-sm);
    font-size: 12px;
    height: 32px;
  }

  .input-group :deep(button) {
    width: 100%;
    padding: var(--spacing-sm);
    font-size: 12px;
    height: 32px;
  }
}
</style>
