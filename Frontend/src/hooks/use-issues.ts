import { getIssue, getIssues } from '@/api/issues.api'
import { useQuery } from '@tanstack/react-query'

export function useIssues() {
  return useQuery({
    queryKey: ['issues'],
    queryFn: () => getIssues(1, 24),
  })
}

export function useIssue(id: string) {
  return useQuery({
    queryKey: ['issue', id],
    queryFn: () => getIssue(id),
    enabled: Boolean(id),
  })
}
