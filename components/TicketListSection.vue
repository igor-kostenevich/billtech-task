<script setup lang="ts">
const store = useTicketsStore()
const { fetchTickets } = useFetchTickets()
const { filterByStops } = useTicketFilter()
const { sortBy } = useTicketSort()
const { debounce } = useHelpers()

onMounted(() => {
  fetchTickets()
})
</script>

<template>
  <section class="flex flex-col gap-4">
    <template v-if="store.loading && !store.visibleTickets.length">
      <TicketSkeleton v-for="i in 5" :key="i" />
    </template>

    <template v-else-if="store.error">
      <p class="text-center text-sm text-red-500 font-semibold">{{ store.error }}</p>
    </template>

    <template v-else-if="!store.visibleTickets.length">
      <p class="text-center text-sm text-gray-500">Немає квитків за заданими параметрами</p>
    </template>

    <template v-else>
      <Transition
        v-for="ticket in store.visibleTickets"
        :key="ticket.id"
        name="fade"
        appear
      >
        <TicketCard
          :ticket="ticket"
          class="relative"
        />
      </Transition>

      <button
        v-if="store.visibleTickets.length < store.filteredAndSortedTickets.length"
        class="bg-primary text-white px-5 py-[15px] rounded self-center uppercase text-xs font-semibold leading-5 w-full hover:bg-primary/80 transition-colors duration-300 outline-none ring-0"
        @click="store.showMore()"
      >
        Завантажити ще 5 квитків
      </button>
    </template>
  </section>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

