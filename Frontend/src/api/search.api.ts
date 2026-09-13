import { delay } from '@/lib/utils'
import { articles } from '@/mocks/articles'
import { cultureItems } from '@/mocks/culture'
import { issues } from '@/mocks/issues'
import { places } from '@/mocks/locations'
import { posts } from '@/mocks/posts'
import { users } from '@/mocks/users'
import type { SearchFilters, SearchResults } from '@/types'
import { apiClient } from './client'

function includesQ(value: string, q: string) {
  return value.toLowerCase().includes(q)
}

export async function searchEverything(
  query: string,
  filters: SearchFilters = {},
): Promise<SearchResults> {
  if (apiClient.useMock) {
    await delay(280)
    const q = query.trim().toLowerCase()
    const district = filters.district

    const people = users.filter(
      (u) =>
        !q ||
        includesQ(u.displayName, q) ||
        includesQ(u.username, q) ||
        includesQ(u.bio, q),
    )
    const matchedPosts = posts.filter(
      (p) =>
        (!q || includesQ(p.content, q) || p.tags.some((t) => includesQ(t, q))) &&
        (!district || p.district === district),
    )
    const matchedIssues = issues.filter(
      (i) =>
        (!q ||
          includesQ(i.title, q) ||
          includesQ(i.description, q) ||
          includesQ(i.category, q)) &&
        (!district || i.district === district) &&
        (!filters.category || i.category === filters.category),
    )
    const matchedArticles = articles.filter(
      (a) =>
        (!q ||
          includesQ(a.title, q) ||
          includesQ(a.subtitle, q) ||
          a.tags.some((t) => includesQ(t, q))) &&
        (!district || a.district === district),
    )
    const matchedPlaces = places.filter(
      (p) =>
        (!q ||
          includesQ(p.name, q) ||
          includesQ(p.description, q) ||
          p.tags.some((t) => includesQ(t, q))) &&
        (!district || p.district === district) &&
        (!filters.category || p.category === filters.category),
    )
    const culture = cultureItems.filter(
      (c) =>
        !q ||
        includesQ(c.title, q) ||
        includesQ(c.history, q) ||
        c.tags.some((t) => includesQ(t, q)),
    )
    const tags = Array.from(
      new Set([
        ...posts.flatMap((p) => p.tags),
        ...articles.flatMap((a) => a.tags),
        ...places.flatMap((p) => p.tags),
      ]),
    ).filter((t) => !q || includesQ(t, q))

    return {
      query,
      people,
      posts: matchedPosts,
      issues: matchedIssues,
      articles: matchedArticles,
      places: matchedPlaces,
      culture,
      tags,
    }
  }

  const params = new URLSearchParams({ q: query })
  if (filters.district) params.set('district', filters.district)
  if (filters.category) params.set('category', filters.category)
  if (filters.entity) params.set('entity', filters.entity)
  if (filters.sort) params.set('sort', filters.sort)
  return apiClient.get(`/api/search?${params.toString()}`)
}
