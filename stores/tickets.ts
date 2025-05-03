import { defineStore } from 'pinia'
import type { Ticket, SortOptions } from '@/types/tickets'
import { useTicketFilter } from '@/composables/useTicketFilter'
import { useTicketSort } from '@/composables/useTicketSort'

export const useTicketsStore = defineStore('tickets', {
  state: () => ({
    allTickets: [] as (Ticket & { id: string })[],
    visibleCount: 5,
    selectedStops: [] as number[],
    sortMode: 'cheap' as SortOptions,
    loading: false,
    isFinished: false,
    isFetchingMore: false,
    error: null as string | null,
    totalLoaded: 0,
    searchId: '',
    sortedFilteredCache: [] as Ticket[],
    lastCacheKey: '',
  }),

  getters: {
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
    addTickets(tickets: (Ticket & { id: string })[]) {
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

    setSortMode(mode: SortOptions) {
      this.sortMode = mode
      this.lastCacheKey = ''
    },

    reset() {
      this.allTickets = []
      this.visibleCount = 5
      this.selectedStops = []
      this.sortMode = 'cheap'
      this.loading = false
      this.error = null
      this.isFinished = false
      this.totalLoaded = 0
      this.searchId = ''
      this.isFetchingMore = false
      this.sortedFilteredCache = []
      this.lastCacheKey = ''
    }
  }
})
