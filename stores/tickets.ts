import { defineStore } from 'pinia'
import type { Ticket, SortOptions } from '@/types/tickets'

export const useTicketsStore = defineStore('tickets', {
  state: () => ({
    allTickets: [] as (Ticket & { id: string })[],
    filteredTickets: [] as (Ticket & { id: string })[],
    visibleCount: 5,
    selectedStops: [] as number[],
    sortMode: 'cheap' as SortOptions,
    loading: false,
    isFinished: false,
    isFetchingMore: false,
    error: null as string | null,
    totalLoaded: 0,
    searchId: '',
  }),

  getters: {
    visibleTickets: (state) =>
      state.filteredTickets.slice(0, state.visibleCount),
  },

  actions: {
    addTickets(tickets: (Ticket & { id: string })[]) {
      this.allTickets.push(...tickets)
    },

    applyProcessed(tickets: (Ticket & { id: string })[]) {
      this.filteredTickets = tickets
    },

    showMore() {
      this.visibleCount += 5
    },

    setStopsFilter(stops: number[]) {
      this.selectedStops = stops
    },

    setSortMode(mode: SortOptions) {
      this.sortMode = mode
    },

    reset() {
      this.allTickets = []
      this.filteredTickets = []
      this.visibleCount = 5
      this.selectedStops = []
      this.sortMode = 'cheap'
      this.loading = false
      this.error = null
      this.isFinished = false
      this.totalLoaded = 0
      this.searchId = ''
      this.isFetchingMore = false
    }
  }
})
