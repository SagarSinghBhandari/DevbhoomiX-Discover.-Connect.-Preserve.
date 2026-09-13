import { getNotifications } from '@/api/notifications.api'
import { useQuery } from '@tanstack/react-query'

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  })
}
