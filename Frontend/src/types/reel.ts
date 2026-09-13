import type { District, ISODateTime, UUID } from './common'
import type { User } from './user'

export type Reel = {
  id: UUID
  author: User
  caption: string
  videoUrl: string
  posterUrl: string
  locationLabel?: string
  district?: District
  tags: string[]
  likeCount: number
  commentCount: number
  viewCount: number
  likedByMe: boolean
  savedByMe: boolean
  durationSec: number
  createdAt: ISODateTime
}
