import type { District, ISODateTime, UUID } from './common'

export type UserRole = 'CITIZEN' | 'CONTRIBUTOR' | 'MODERATOR' | 'ADMIN' | 'OFFICIAL'

export type User = {
  id: UUID
  username: string
  displayName: string
  email: string
  bio: string
  location: string
  district?: District
  avatarUrl: string
  coverUrl: string
  interests: string[]
  contributionScore: number
  followers: number
  following: number
  followedByMe: boolean
  role: UserRole
  verified: boolean
  createdAt: ISODateTime
}

export type AuthSession = {
  user: User
  accessToken: string
  refreshToken: string
}

export type RegisterPayload = {
  username: string
  displayName: string
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type FollowPayload = {
  userId: UUID
}
