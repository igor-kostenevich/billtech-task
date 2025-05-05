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
    isBuffering: false,
    isFinished: false,
    isFetchingMore: false,
    error: null as string | null,
    totalLoaded: 0,
    searchId: '',
    sortedFilteredCache: [] as Ticket[],
    lastCacheKey: '',
  }),

  getters: {
    // Returns filtered and sorted tickets based on selected stops and sort mode
    filteredAndSortedTickets(state): Ticket[] {
      const { filterByStops } = useTicketFilter()
      const { sortBy } = useTicketSort()

      const key = `${state.selectedStops.join(',')}-${state.sortMode}-${state.allTickets.length}`

      if (key === state.lastCacheKey) return state.sortedFilteredCache

      const filtered = filterByStops(state.allTickets, state.selectedStops)
      const sorted = sortBy(filtered, state.sortMode)

      state.lastCacheKey = key
      state.sortedFilteredCache = sorted
      return sorted
    },

    visibleTickets(): Ticket[] {
      return this.filteredAndSortedTickets.slice(0, this.visibleCount)
    },
  },

  actions: {
    addTickets(tickets: Ticket[]) {
      this.allTickets.push(...tickets)
      this.lastCacheKey = ''
    },

    showMore() {
      this.visibleCount += 5
    },

    setStopsFilter(stops: number[]) {
      this.selectedStops = stops
      this.lastCacheKey = ''
    },

    setSortMode(mode: SortMode) {
      this.sortMode = mode
      this.lastCacheKey = ''
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
        sortedFilteredCache: [],
        lastCacheKey: '',
      })
    },
  }
})
