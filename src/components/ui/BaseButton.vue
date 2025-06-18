<template>
  <button :class="buttonClasses" :disabled="disabled" @click="$emit('click')" :type="type">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button',
})

defineEmits<{
  click: []
}>()

const buttonClasses = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  { 'base-button--disabled': props.disabled },
])
</script>

<style scoped>
.base-button {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

/* Размеры */
.base-button--small {
  padding: 6px 12px;
  font-size: 14px;
}

.base-button--medium {
  padding: 8px 16px;
  font-size: 14px;
}

.base-button--large {
  padding: 12px 24px;
  font-size: 16px;
}

/* Варианты */
.base-button--primary {
  background: var(--color-primary);
  color: var(--color-text-light);
}

.base-button--primary:hover:not(.base-button--disabled) {
  background: var(--color-primary-hover);
}

.base-button--secondary {
  background: var(--color-secondary);
  color: var(--color-text-light);
}

.base-button--secondary:hover:not(.base-button--disabled) {
  background: var(--color-secondary-hover);
}

.base-button--danger {
  background: var(--color-danger);
  color: var(--color-text-light);
}

.base-button--danger:hover:not(.base-button--disabled) {
  background: var(--color-danger-hover);
}

.base-button--ghost {
  background: var(--color-light);
  color: var(--color-text);
  border: 1px solid var(--color-primary);
}

.base-button--ghost:hover:not(.base-button--disabled) {
  background: var(--color-light-hover);
}

.base-button--ghost.active {
  background: var(--color-primary);
  color: var(--color-text-light);
  border-color: var(--color-primary);
  border: 1px solid var(--color-border-light);
}

.base-button--ghost.active:hover {
  background: var(--color-primary-hover);
}

/* Состояние disabled */
.base-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-button--disabled:hover {
  transform: none;
}
</style>
