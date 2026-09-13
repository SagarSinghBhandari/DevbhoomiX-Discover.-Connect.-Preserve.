import type { ISODateTime, UUID } from './common'

export type NotificationKind =
  | 'ISSUE_UPDATE'
  | 'COMMENT'
  | 'LIKE'
  | 'FOLLOW'
  | 'ARTICLE_APPROVAL'
  | 'CONTRIBUTION'
  | 'MENTION'
  | 'SYSTEM'

export type Notification = {
  id: UUID
  kind: NotificationKind
  title: string
  body: string
  href: string
  read: boolean
  createdAt: ISODateTime
}
