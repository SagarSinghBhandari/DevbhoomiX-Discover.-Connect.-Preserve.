import type { District } from './common'
import type { Article } from './article'
import type { Issue } from './issue'
import type { Place } from './location'
import type { Post } from './post'
import type { User } from './user'
import type { CultureItem } from './culture'

export type SearchEntity =
  | 'people'
  | 'posts'
  | 'issues'
  | 'articles'
  | 'places'
  | 'culture'
  | 'heritage'
  | 'tags'

export type SearchFilters = {
  district?: District
  region?: string
  category?: string
  type?: string
  sort?: 'popularity' | 'recent'
  entity?: SearchEntity | 'all'
}

export type SearchResults = {
  query: string
  people: User[]
  posts: Post[]
  issues: Issue[]
  articles: Article[]
  places: Place[]
  culture: CultureItem[]
  tags: string[]
}
