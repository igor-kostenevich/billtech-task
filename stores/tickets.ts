import { defineStore } from 'pinia'
import type { Ticket, SortMode } from '@/types/tickets'
import { useTicketFilter } from '@/composables/useTicketFilter'
import { useTicketSort } from '@/composables/useTicketSort'

export const useTicketsStore = defineStore('tickets', {
  state: () => ({
    allTickets: [] as Ticket[],
    visibleCount: 5,
    selectedStops: [] as number[],
    sortMode: 'cheap' as SortMode,
    loading: false,
    isFinished: false,
    isFetchingMore: false,
    error: null as string | null,
    totalLoaded: 0,
    searchId: '',
    cache: {} as Record<string, Ticket[]>,
  }),

  getters: {
    // Returns filtered and sorted tickets based on selected stops and sort mode
    filteredAndSortedTickets(state): Ticket[] {
      const { filterByStops } = useTicketFilter()
      const { sortBy } = useTicketSort()

      const stopsKey = state.selectedStops.slice().sort().join('-') || 'all'
      const cacheKey = `${state.sortMode}-${stopsKey}`

      if (state.cache[cacheKey]) return state.cache[cacheKey]

      const filtered = filterByStops(state.allTickets, state.selectedStops)
      const sorted = sortBy(filtered, state.sortMode)

      state.cache[cacheKey] = sorted
      return sorted
    },

    visibleTickets(): Ticket[] {
      return this.filteredAndSortedTickets.slice(0, this.visibleCount)
    },
  },

  actions: {
    addTickets(tickets: Ticket[]) {
      this.allTickets.push(...tickets)
      this.cache = {}
    },

    showMore() {
      this.visibleCount += 5
    },

    setStopsFilter(stops: number[]) {
      this.selectedStops = stops
    },

    setSortMode(mode: SortMode) {
      this.sortMode = mode
    },

    reset() {
      Object.assign(this, {
        allTickets: [],
        visibleCount: 5,
        selectedStops: [],
        sortMode: 'cheap',
        loading: false,
        error: null,
        isFinished: false,
        totalLoaded: 0,
        searchId: '',
        isFetchingMore: false,
        cache: {},
      })
    },
  }
})
