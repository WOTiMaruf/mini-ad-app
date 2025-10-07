const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24

export function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

export function getDaysLeft(end: string | Date): number {
  const now = new Date()
  const endDate = new Date(end)

  const difference = endDate.getTime() - now.getTime()

  return Math.max(0, Math.ceil(difference / MILLISECONDS_IN_DAY))
}

export function formatDateRange(start: string | Date, end: string | Date): string {
  const startTime = new Date(start)
  const endTime = new Date(end)
  
  return `${formatDate(startTime)} - ${formatDate(endTime)}, ${endTime.getFullYear()}`
}
