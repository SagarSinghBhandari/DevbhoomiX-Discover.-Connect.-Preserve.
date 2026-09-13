import { getCultureItem, getCultureItems, getPlace, getPlaces } from '@/api/locations.api'
import { useQuery } from '@tanstack/react-query'

export function usePlaces() {
  return useQuery({ queryKey: ['places'], queryFn: getPlaces })
}

export function usePlace(slug: string) {
  return useQuery({
    queryKey: ['place', slug],
    queryFn: () => getPlace(slug),
    enabled: Boolean(slug),
  })
}

export function useCultureItems() {
  return useQuery({ queryKey: ['culture'], queryFn: getCultureItems })
}

export function useCultureItem(slug: string) {
  return useQuery({
    queryKey: ['culture', slug],
    queryFn: () => getCultureItem(slug),
    enabled: Boolean(slug),
  })
}
