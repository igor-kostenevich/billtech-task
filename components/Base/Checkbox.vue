<script setup lang="ts">
const props = defineProps<{
  id?: string
  label?: string
  modelValue: boolean
  disabled?: boolean
  name?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const checkboxId = computed(() => props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`)

const toggle = () => {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <label
    :for="checkboxId"
    class="inline-flex items-center gap-2.5 cursor-pointer select-none"
  >
    <input
      :id="checkboxId"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :name="name"
      class="sr-only peer"
      @change="toggle"
    />

    <div
      class="w-5 h-5 border rounded-sm flex items-center justify-center"
      :class="[modelValue ? 'border-primary' : 'border-[#9ABBCE]']"
    >
      <svg
        v-if="modelValue"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.28571 8L0 4.16123L1.20857 3.0787L4.28571 5.82726L10.7914 0L12 1.09021L4.28571 8Z"
          fill="#2196F3"
        />
      </svg>
    </div>

    <span class="text-[13px] text-secondary leading-5">
      {{ label }}
    </span>
  </label>
</template>
