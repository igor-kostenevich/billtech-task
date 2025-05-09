import type { Ticket, SortMode } from '@/types/tickets'

export const useTicketSort = () => {
  const totalDuration = (ticket: Ticket) => ticket.segments[0].duration + ticket.segments[1].duration

  const sortStrategies: Record<SortMode, (a: Ticket, b: Ticket) => number> = {
    cheap: (a, b) => a.price - b.price,
    fast: (a, b) => totalDuration(a) - totalDuration(b),
    optimal: (a, b) => (a.price + totalDuration(a)) - (b.price + totalDuration(b))
  }

  const sortBy = (tickets: Ticket[], mode: SortMode): Ticket[] => {
    const sortFn = sortStrategies[mode]
    return [...tickets].sort(sortFn)
  }

  return {
    sortBy,
    totalDuration
  }
}

