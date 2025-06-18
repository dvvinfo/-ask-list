<template>
  <div class="base-input-wrapper">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @keyup.enter="$emit('enter')"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  size: 'medium',
  error: false,
})

defineEmits<{
  'update:modelValue': [value: string]
  enter: []
  focus: []
  blur: []
}>()

const inputClasses = computed(() => [
  'base-input',
  `base-input--${props.size}`,
  { 'base-input--error': props.error },
  { 'base-input--disabled': props.disabled },
])
</script>

<style scoped>
.base-input-wrapper {
  width: 100%;
}

.base-input {
  width: 100%;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-family: inherit;
  font-size: 16px;
  transition: all 0.2s ease;
  background: var(--color-white);
}

.base-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-focus);
}

.base-input:disabled {
  background: var(--color-light);
  cursor: not-allowed;
  opacity: 0.6;
}

.base-input--error {
  border-color: var(--color-danger);
}

.base-input--error:focus {
  border-color: var(--color-danger);
  box-shadow: var(--shadow-focus-error);
}

/* Размеры */
.base-input--small {
  padding: 8px 12px;
  font-size: 14px;
}

.base-input--medium {
  padding: 12px 16px;
  font-size: 16px;
}

.base-input--large {
  padding: 16px 20px;
  font-size: 18px;
}
</style>
