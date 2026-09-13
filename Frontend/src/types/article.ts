import type { District, ISODateTime, UUID } from './common'
import type { MediaAsset } from './media'
import type { User } from './user'

export type ArticleType =
  | 'Articles'
  | 'Research'
  | 'Reports'
  | 'Historical Documents'
  | 'Government Documents'
  | 'Local Knowledge'
  | 'Oral Histories'
  | 'Educational Resources'

export type ArticleStatus = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'REJECTED'

export type ArticleBlock =
  | { kind: 'heading'; level: 2 | 3; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'quote'; text: string; attribution?: string }
  | { kind: 'image'; url: string; caption?: string; alt?: string }
  | { kind: 'video'; url: string; caption?: string }

export type ArticleRevision = {
  id: UUID
  version: number
  summary: string
  editorName: string
  createdAt: ISODateTime
}

export type Article = {
  id: UUID
  slug: string
  title: string
  subtitle: string
  author: User
  type: ArticleType
  status: ArticleStatus
  cover: MediaAsset
  readingTimeMin: number
  body: ArticleBlock[]
  tags: string[]
  district?: District
  topic: string
  relatedArticleIds: UUID[]
  relatedPlaceIds: UUID[]
  relatedIssueIds: UUID[]
  references: { title: string; url?: string; source: string }[]
  revisions: ArticleRevision[]
  publishedAt?: ISODateTime
  createdAt: ISODateTime
  updatedAt: ISODateTime
}

export type CreateArticlePayload = {
  title: string
  subtitle: string
  type: ArticleType
  topic: string
  tags: string[]
  district?: District
  coverUrl: string
  body: ArticleBlock[]
  references: { title: string; url?: string; source: string }[]
}
