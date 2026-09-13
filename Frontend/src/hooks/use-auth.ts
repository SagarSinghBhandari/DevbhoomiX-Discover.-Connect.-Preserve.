import { getCurrentUser } from '@/api/auth.api'
import { useQuery } from '@tanstack/react-query'

export function useCurrentUser() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    staleTime: 60_000,
  })
}
