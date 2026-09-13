import { getPost, getPosts } from '@/api/posts.api'
import { useQuery } from '@tanstack/react-query'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(1, 24),
  })
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    enabled: Boolean(id),
  })
}
