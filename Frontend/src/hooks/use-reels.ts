import { getReels } from '@/api/reels.api'
import { useQuery } from '@tanstack/react-query'

export function useReels() {
  return useQuery({
    queryKey: ['reels'],
    queryFn: getReels,
  })
}
