import type { District, ISODateTime, UUID } from './common'
import type { MediaAsset } from './media'
import type { User } from './user'

export type PostType =
  | 'Discussion'
  | 'Question'
  | 'Opinion'
  | 'Experience'
  | 'News'
  | 'Knowledge'
  | 'Issue'
  | 'Announcement'

export type Post = {
  id: UUID
  author: User
  type: PostType
  content: string
  media: MediaAsset[]
  tags: string[]
  district?: District
  locationLabel?: string
  likeCount: number
  commentCount: number
  likedByMe: boolean
  savedByMe: boolean
  createdAt: ISODateTime
}

export type Comment = {
  id: UUID
  postId?: UUID
  issueId?: UUID
  articleId?: UUID
  author: User
  body: string
  createdAt: ISODateTime
}

export type CreatePostPayload = {
  type: PostType
  content: string
  tags: string[]
  district?: District
  mediaUrls: string[]
}
