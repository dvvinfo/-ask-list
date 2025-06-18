<template>
  <label class="base-checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="handleChange"
      :disabled="disabled"
      class="base-checkbox__input"
    />
    <span class="base-checkbox__checkmark"></span>
    <span v-if="$slots.default" class="base-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<style scoped>
.base-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-family: inherit;
  user-select: none;
}

.base-checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.base-checkbox__checkmark {
  height: 18px;
  width: 18px;
  background-color: var(--color-white);
  border: 2px solid var(--color-border);
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.base-checkbox:hover .base-checkbox__checkmark {
  border-color: var(--color-primary);
}

.base-checkbox__input:checked ~ .base-checkbox__checkmark {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.base-checkbox__input:checked ~ .base-checkbox__checkmark:after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid var(--color-white);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.base-checkbox__input:disabled ~ .base-checkbox__checkmark {
  background-color: var(--color-light);
  border-color: var(--color-border-light);
  cursor: not-allowed;
}

.base-checkbox__input:disabled:checked ~ .base-checkbox__checkmark {
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
}

.base-checkbox__label {
  font-size: 16px;
  color: var(--color-text);
}

.base-checkbox:has(.base-checkbox__input:disabled) {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
