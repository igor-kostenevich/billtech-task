<script setup lang="ts">
import { TabGroup, TabList, Tab } from '@headlessui/vue'
import { useTicketsStore } from '@/stores/tickets'
import type { SortMode } from '@/types/tickets'

const store = useTicketsStore()

const tabs: { label: string; value: SortMode }[] = [
  { label: 'Найдешевші', value: 'cheap' },
  { label: 'Найшвидші', value: 'fast' },
  { label: 'Оптимальні', value: 'optimal' }
]

const selectedIndex = computed(() => tabs.findIndex(tab => tab.value === store.sortMode))

const updateSort = (index: number) => {
  store.setSortMode(tabs[index].value)
}
</script>

<template>
  <TabGroup 
    as="div" 
    class="mb-5" 
    :selected-index="selectedIndex" 
    @change="updateSort"
  >
    <TabList class="flex">
      <Tab
        v-for="tab in tabs"
        :key="tab.value"
        as="button"
        class="tab-button"
      >
        {{ tab.label }}
      </Tab>
    </TabList>
  </TabGroup>
</template>
