<script setup lang="ts">
import { useTicketsStore } from '@/stores/tickets'

const store = useTicketsStore()
const selected = ref<number[]>([])
const options: { label: string; value: number | 'all' }[] = [
  { label: 'Всі', value: 'all' },
  { label: 'Без пересадок', value: 0 },
  { label: '1 пересадка', value: 1 },
  { label: '2 пересадки', value: 2 },
  { label: '3 пересадки', value: 3 },
]


const toggleOption = (optValue: number | 'all', checked: boolean) => {
  if (optValue === 'all') {
    selected.value = checked ? [0, 1, 2, 3] : []
    return
  }

  const val = optValue as number
  const current = new Set(selected.value)
  checked ? current.add(val) : current.delete(val)
  selected.value = [...current]
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
  <aside class="bg-white rounded-[5px] pt-5 pb-2.5 w-full max-w-[232px] shadow-lg">
    <h2 class="mb-2.5 px-5 font-semibold text-xs text-secondary uppercase">Кількість пересадок</h2>

    <div class="flex flex-col">
      <BaseCheckbox
        v-for="opt in options"
        :key="String(opt.value)"
        :label="opt.label"
        class="px-5 py-2.5 cursor-pointer hover:bg-light-secondary transition-colors"
        :model-value="opt.value === 'all'
          ? selected.length === 4
          : selected.includes(opt.value as number)"
        @update:model-value="checked => toggleOption(opt.value, checked)"
      />
    </div>
  </aside>
</template>
