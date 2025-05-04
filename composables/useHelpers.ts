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
    const label = count === 0 ? 'БЕЗ ПЕРЕСАДОК'
                    : count === 1 ? '1 пересадка'
                    : `${count} пересадки`

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

  const debounce = <T extends (...args: any[]) => void>(fn: T, delay = 200): (...args: Parameters<T>) => void => {
    let timeout: ReturnType<typeof setTimeout> | null = null

    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => fn(...args), delay)
    }
  }

  return {
    formatTimeRange,
    formatDate,
    formatDuration,
    formatStops,
    formatPrice,
    debounce,
  }
}
