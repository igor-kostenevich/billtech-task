import type { Ticket } from '@/types/tickets'
import { useTicketsStore } from '@/stores/tickets'
import { useHelpers } from '@/composables/useHelpers'

export const useFetchTickets = () => {
  const store = useTicketsStore()
  const config = useRuntimeConfig()
  const API_URL = config.public.baseURL
  const { debounce } = useHelpers()
  const bufferedTickets: Ticket[] = []
  let bufferResolver: (() => void) | null = null
  let isBuffering = false

  // Function to flush buffered tickets to the store
  const flushBufferedTickets = () => {
    if (!bufferedTickets.length) return
    store.addTickets([...bufferedTickets])
    bufferedTickets.length = 0
    bufferResolver?.()
    bufferResolver = null
    isBuffering = false
  }

  const debouncedFlush = debounce(flushBufferedTickets, 1000)

  // Fetches search ID required for ticket polling
  const fetchSearchId = async () => {
    const { searchId } = await $fetch<{ searchId: string }>(`${API_URL}/search`)
    store.searchId = searchId
  }

  // Fetches all tickets in batches using long polling with retry logic
  const fetchAllTickets = async () => {
    if (!store.searchId || store.isFinished || store.isFetchingMore) return

    let stop = false
    let consecutiveErrors = 0
    store.isFetchingMore = true

    while (!stop) {
      try {
        const res = await $fetch<{ tickets: Ticket[]; stop: boolean }>(
          `${API_URL}/tickets`,
          { query: { searchId: store.searchId } }
        )

        const tickets = res.tickets.map(t => ({
          ...t,
          id: crypto.randomUUID(),
        }))

        bufferedTickets.push(...tickets)
        isBuffering = true

        if (store.totalLoaded === 0) {
          flushBufferedTickets()
        } else {
          debouncedFlush()
        }

        store.totalLoaded += tickets.length
        stop = res.stop
        consecutiveErrors = 0
      } catch (err: any) {
        const status = err?.response?.status
        if (status === 500 || status === 502) {
          consecutiveErrors++

          if (consecutiveErrors >= 3) {
            store.error = 'Занадто багато помилок. Спробуйте пізніше.'
            break
          }

          await new Promise(resolve => setTimeout(resolve, 1000))
          continue
        }

        store.error = 'Помилка при завантаженні квитків.'
        break
      }
    }

    store.isFinished = true
    store.isFetchingMore = false

    flushBufferedTickets()
  }

  const waitForBufferFlush = () => {
    if (!isBuffering) return Promise.resolve()
    return new Promise<void>(resolve => {
      bufferResolver = resolve
    })
  }

  // Fetch tickets function that handles loading
  const fetchTickets = async () => {
    if (store.loading) return
    store.reset()
    store.loading = true

    try {
      await fetchSearchId()
      await fetchAllTickets()
      await waitForBufferFlush()
    } catch (e) {
      store.error = 'Не вдалося отримати searchId'
    } finally {
      store.loading = false
    }
  }

  return {
    fetchTickets,
  }
}
