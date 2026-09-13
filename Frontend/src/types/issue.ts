import type { ContentOrigin, District, GeoPoint, ISODateTime, Region, UUID } from './common'
import type { MediaAsset } from './media'
import type { User } from './user'

export type IssueCategory =
  | 'Roads'
  | 'Water'
  | 'Education'
  | 'Healthcare'
  | 'Environment'
  | 'Tourism'
  | 'Electricity'
  | 'Waste'
  | 'Transport'
  | 'Employment'
  | 'Disaster'
  | 'Infrastructure'
  | 'Other'

export type IssueStatus =
  | 'REPORTED'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'REJECTED'

export type IssueSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export type TimelineEventKind =
  | 'REPORTED'
  | 'VERIFIED'
  | 'AUTHORITY_NOTIFIED'
  | 'WORK_STARTED'
  | 'RESOLVED'
  | 'REJECTED'
  | 'COMMENT'

export type IssueTimelineEvent = {
  id: UUID
  kind: TimelineEventKind
  title: string
  description: string
  origin: ContentOrigin
  actorName: string
  createdAt: ISODateTime
}

export type SuggestedSolution = {
  id: UUID
  title: string
  body: string
  origin: ContentOrigin
  confidence?: number
}

export type Issue = {
  id: UUID
  title: string
  description: string
  category: IssueCategory
  severity: IssueSeverity
  status: IssueStatus
  district: District
  region: Region
  locality: string
  coordinates: GeoPoint
  reporter: User
  evidence: MediaAsset[]
  commentsCount: number
  supportCount: number
  supportedByMe: boolean
  officialReferenceId?: string
  relatedIssueIds: UUID[]
  suggestedSolutions: SuggestedSolution[]
  timeline: IssueTimelineEvent[]
  origin: ContentOrigin
  createdAt: ISODateTime
  updatedAt: ISODateTime
}

export type CreateIssuePayload = {
  title: string
  description: string
  category: IssueCategory
  severity: IssueSeverity
  district: District
  locality: string
  latitude: number
  longitude: number
  evidenceUrls: string[]
}
