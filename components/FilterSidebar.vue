<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTicketsStore } from '@/stores/tickets'

const store = useTicketsStore()

const options: { label: string; value: number | 'all' }[] = [
  { label: 'Всі', value: 'all' },
  { label: 'Без пересадок', value: 0 },
  { label: '1 пересадка', value: 1 },
  { label: '2 пересадки', value: 2 },
  { label: '3 пересадки', value: 3 },
]

const selected = ref<number[]>([])

const toggleOption = (optValue: number | 'all', checked: boolean) => {
  if (optValue === 'all') {
    selected.value = checked ? [0, 1, 2, 3] : []
  } else {
    const val = optValue as number
    selected.value = checked
      ? [...selected.value, val]
      : selected.value.filter(v => v !== val)
  }
}

watch(selected, (newVal) => {
  if (newVal.length === 0 || newVal.length === 4) {
    store.setStopsFilter([])
  } else {
    store.setStopsFilter([...newVal])
  }
})
</script>

<template>
  <aside class="bg-white rounded-[5px] p-5 w-full max-w-[232px] shadow-sm">
    <h2 class="mb-5 font-semibold text-xs text-secondary uppercase">Кількість пересадок</h2>

    <div class="flex flex-col gap-2.5">
      <BaseCheckbox
        v-for="opt in options"
        :key="String(opt.value)"
        :label="opt.label"
        :model-value="opt.value === 'all'
          ? selected.length === 4
          : selected.includes(opt.value as number)"
        @update:model-value="checked => toggleOption(opt.value, checked)"
      />
    </div>
  </aside>
</template>
