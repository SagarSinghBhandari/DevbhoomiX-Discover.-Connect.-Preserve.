import { delay, paginate } from '@/lib/utils'
import { comments } from '@/mocks/posts'
import { getIssueById, issues } from '@/mocks/issues'
import { currentUser } from '@/mocks/users'
import type { Comment, CreateIssuePayload, Issue, Paginated } from '@/types'
import { apiClient } from './client'

export async function getIssues(page = 1, pageSize = 12): Promise<Paginated<Issue>> {
  if (apiClient.useMock) {
    await delay(280)
    return paginate(issues, page, pageSize)
  }
  return apiClient.get(`/api/issues?page=${page}&pageSize=${pageSize}`)
}

export async function getIssue(id: string): Promise<Issue> {
  if (apiClient.useMock) {
    await delay(240)
    const issue = getIssueById(id)
    if (!issue) throw new Error('Issue not found')
    return issue
  }
  return apiClient.get(`/api/issues/${id}`)
}

export async function createIssue(payload: CreateIssuePayload): Promise<Issue> {
  if (apiClient.useMock) {
    await delay(500)
    const issue: Issue = {
      id: crypto.randomUUID(),
      title: payload.title,
      description: payload.description,
      category: payload.category,
      severity: payload.severity,
      status: 'REPORTED',
      district: payload.district,
      region: 'Garhwal',
      locality: payload.locality,
      coordinates: { latitude: payload.latitude, longitude: payload.longitude },
      reporter: currentUser,
      evidence: payload.evidenceUrls.map((url) => ({
        id: crypto.randomUUID(),
        kind: 'IMAGE',
        url,
        createdAt: new Date().toISOString(),
      })),
      commentsCount: 0,
      supportCount: 1,
      supportedByMe: true,
      relatedIssueIds: [],
      suggestedSolutions: [],
      timeline: [
        {
          id: crypto.randomUUID(),
          kind: 'REPORTED',
          title: 'Reported',
          description: 'Community submitted this issue.',
          origin: 'COMMUNITY_SUBMITTED',
          actorName: currentUser.displayName,
          createdAt: new Date().toISOString(),
        },
      ],
      origin: 'COMMUNITY_SUBMITTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    issues.unshift(issue)
    return issue
  }
  return apiClient.post('/api/issues', payload)
}

export async function supportIssue(id: string): Promise<{ supported: boolean; supportCount: number }> {
  if (apiClient.useMock) {
    await delay(160)
    const issue = getIssueById(id)
    if (!issue) throw new Error('Issue not found')
    issue.supportedByMe = !issue.supportedByMe
    issue.supportCount += issue.supportedByMe ? 1 : -1
    return { supported: issue.supportedByMe, supportCount: issue.supportCount }
  }
  return apiClient.post(`/api/issues/${id}/support`)
}

export async function getIssueComments(issueId: string): Promise<Comment[]> {
  if (apiClient.useMock) {
    await delay(180)
    return comments.filter((c) => c.issueId === issueId)
  }
  return apiClient.get(`/api/issues/${issueId}/comments`)
}
