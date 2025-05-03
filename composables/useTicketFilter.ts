import type { Ticket } from '@/types/tickets'

export const useTicketFilter = () => {
  const filterByStops = (tickets: Ticket[], selectedStops: number[]): Ticket[] => {
    if (selectedStops.length === 0) return tickets
    return tickets.filter(ticket =>
      ticket.segments.every(seg => selectedStops.includes(seg.stops.length))
    )
  }

  return { filterByStops }
}
