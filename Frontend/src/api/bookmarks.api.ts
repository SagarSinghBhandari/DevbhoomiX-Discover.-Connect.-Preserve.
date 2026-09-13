import { delay } from '@/lib/utils'
import { articles } from '@/mocks/articles'
import { issues } from '@/mocks/issues'
import { places } from '@/mocks/locations'
import { posts } from '@/mocks/posts'
import type { Article, Issue, Place, Post } from '@/types'
import { apiClient } from './client'

export type BookmarkCollection = {
  posts: Post[]
  articles: Article[]
  places: Place[]
  issues: Issue[]
}

export async function getBookmarks(): Promise<BookmarkCollection> {
  if (apiClient.useMock) {
    await delay(240)
    return {
      posts: posts.filter((p) => p.savedByMe),
      articles: articles.slice(0, 2),
      places: places.slice(0, 3),
      issues: issues.filter((i) => i.supportedByMe).slice(0, 3),
    }
  }
  return apiClient.get('/api/bookmarks')
}

export async function toggleBookmark(kind: string, id: string): Promise<{ saved: boolean }> {
  if (apiClient.useMock) {
    await delay(150)
    return { saved: true }
  }
  return apiClient.post('/api/bookmarks', { kind, id })
}
