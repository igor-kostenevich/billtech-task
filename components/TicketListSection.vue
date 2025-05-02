<script setup lang="ts">
const store = useTicketsStore()
const { fetchTickets } = useFetchTickets()
const { filterByStops } = useTicketFilter()
const { sortBy } = useTicketSort()

onMounted(async () => {
  await fetchTickets()

  const filtered = filterByStops(store.allTickets, store.selectedStops)
  const sorted = sortBy(filtered, store.sortMode)
  store.applyProcessed(sorted)
})

watch([() => store.selectedStops, () => store.sortMode], () => {
  const filtered = filterByStops(store.allTickets, store.selectedStops)
  const sorted = sortBy(filtered, store.sortMode)
  store.applyProcessed(sorted)
})
</script>

<template>
  <section class="flex flex-col gap-4">
    <template v-if="store.loading">
      <p class="text-center text-sm text-gray-400">Завантаження квитків...</p>
    </template>

    <template v-else-if="store.error">
      <p class="text-center text-sm text-red-500 font-semibold">{{ store.error }}</p>
    </template>

    <template v-else-if="!store.visibleTickets.length">
      <p class="text-center text-sm text-gray-500">Немає квитків за заданими параметрами</p>
    </template>

    <template v-else>
      <TicketCard
        v-for="ticket in store.visibleTickets"
        :key="ticket.id"
        :ticket="ticket"
      />

      <button
        v-if="store.visibleTickets.length < store.filteredTickets.length"
        class="bg-primary text-white px-5 py-[15px] rounded self-center uppercase text-xs font-semibold leading-5 w-full hover:bg-primary/80 transition-colors duration-300"
        @click="store.showMore()"
      >
        Завантажити ще 5 квитків
      </button>
    </template>
  </section>
</template>



