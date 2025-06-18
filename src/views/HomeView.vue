<script setup lang="ts">
import TaskList from '@/components/TaskList.vue'
</script>

<template>
  <div class="home">
    <header class="header">
      <h1 class="header-title">Список задач</h1>
      <p class="header-subtitle">Управляйте своими задачами с легкостью</p>
    </header>

    <TaskList />
  </div>
</template>

<style scoped>
.home {
  background: var(--gradient-primary);
  padding: 20px 0 0 0;
  border-radius: 10px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  color: var(--color-text-light);
}

.header-title {
  font-size: 2.5rem;
  margin-bottom: 8px;
  font-weight: 700;
}

.header-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}
</style>
