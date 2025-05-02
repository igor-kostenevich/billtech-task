export const useHelpers = () => {
  const formatTimeRange = (dateStr: string, duration: number): string => {
    const start = new Date(dateStr)
    const end = new Date(start.getTime() + duration * 60_000)

    const format = (d: Date) =>
      d.toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })

    return `${format(start)} – ${format(end)}`
  }

  const formatDuration = (mins: number): string => {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return `${h}год ${m}хв`
  }

  const formatStops = (stops: string[]): [string, string] => {
    const count = stops.length
    if (count === 0) return ['БЕЗ ПЕРЕСАДОК', '']

    let label = ''
    if (count === 1) label = '1 пересадка'
    else if (count === 2) label = '2 пересадки'
    else label = `${count} пересадок`

    return [label, stops.join(', ')]
  }

  const formatPrice = (price: number): string => {
    return price.toLocaleString('uk-UA') + ' ₴'
  }

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return {
    formatTimeRange,
    formatDate,
    formatDuration,
    formatStops,
    formatPrice
  }
}
