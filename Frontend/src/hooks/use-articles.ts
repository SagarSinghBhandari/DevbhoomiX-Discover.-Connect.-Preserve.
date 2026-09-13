import { getArticle, getArticles } from '@/api/articles.api'
import { useQuery } from '@tanstack/react-query'

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles(1, 24),
  })
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticle(slug),
    enabled: Boolean(slug),
  })
}
