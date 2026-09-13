import { delay, paginate, slugify } from '@/lib/utils'
import { articles, getArticleBySlug } from '@/mocks/articles'
import { currentUser } from '@/mocks/users'
import type { Article, CreateArticlePayload, Paginated } from '@/types'
import { apiClient } from './client'

export async function getArticles(page = 1, pageSize = 12): Promise<Paginated<Article>> {
  if (apiClient.useMock) {
    await delay(260)
    return paginate(articles, page, pageSize)
  }
  return apiClient.get(`/api/articles?page=${page}&pageSize=${pageSize}`)
}

export async function getArticle(slug: string): Promise<Article> {
  if (apiClient.useMock) {
    await delay(240)
    const article = getArticleBySlug(slug)
    if (!article) throw new Error('Article not found')
    return article
  }
  return apiClient.get(`/api/articles/${slug}`)
}

function fromPayload(payload: CreateArticlePayload, status: Article['status']): Article {
  return {
    id: crypto.randomUUID(),
    slug: slugify(payload.title) || 'untitled',
    title: payload.title,
    subtitle: payload.subtitle,
    author: currentUser,
    type: payload.type,
    status,
    cover: {
      id: crypto.randomUUID(),
      kind: 'IMAGE',
      url: payload.coverUrl,
      createdAt: new Date().toISOString(),
    },
    readingTimeMin: Math.max(4, Math.round(payload.body.length * 2)),
    body: payload.body,
    tags: payload.tags,
    district: payload.district,
    topic: payload.topic,
    relatedArticleIds: [],
    relatedPlaceIds: [],
    relatedIssueIds: [],
    references: payload.references,
    revisions: [
      {
        id: crypto.randomUUID(),
        version: 1,
        summary: status === 'DRAFT' ? 'Saved draft' : 'Submitted',
        editorName: currentUser.displayName,
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function createArticle(payload: CreateArticlePayload): Promise<Article> {
  if (apiClient.useMock) {
    await delay(400)
    const article = fromPayload(payload, 'IN_REVIEW')
    articles.unshift(article)
    return article
  }
  return apiClient.post('/api/articles', payload)
}

export async function updateArticle(id: string, payload: Partial<CreateArticlePayload>): Promise<Article> {
  if (apiClient.useMock) {
    await delay(300)
    const existing = articles.find((a) => a.id === id)
    if (!existing) throw new Error('Article not found')
    Object.assign(existing, payload, { updatedAt: new Date().toISOString() })
    return existing
  }
  return apiClient.patch(`/api/articles/${id}`, payload)
}

export async function publishArticle(id: string): Promise<Article> {
  if (apiClient.useMock) {
    await delay(300)
    const existing = articles.find((a) => a.id === id)
    if (!existing) throw new Error('Article not found')
    existing.status = 'PUBLISHED'
    existing.publishedAt = new Date().toISOString()
    return existing
  }
  return apiClient.post(`/api/articles/${id}/publish`)
}

export async function saveDraft(payload: CreateArticlePayload): Promise<Article> {
  if (apiClient.useMock) {
    await delay(280)
    const article = fromPayload(payload, 'DRAFT')
    articles.unshift(article)
    return article
  }
  return apiClient.post('/api/articles/drafts', payload)
}
