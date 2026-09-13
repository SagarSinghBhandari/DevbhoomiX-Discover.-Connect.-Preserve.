import { delay } from '@/lib/utils'
import { currentUser, getUserById, getUserByUsername, users } from '@/mocks/users'
import type { User } from '@/types'
import { apiClient } from './client'

export async function getUsers(): Promise<User[]> {
  if (apiClient.useMock) {
    await delay(220)
    return users
  }
  return apiClient.get<User[]>('/api/users')
}

export async function getUser(username: string): Promise<User> {
  if (apiClient.useMock) {
    await delay(220)
    const user = getUserByUsername(username)
    if (!user) throw new Error('User not found')
    return user
  }
  return apiClient.get<User>(`/api/users/${username}`)
}

export async function followUser(userId: string): Promise<{ following: boolean; followers: number }> {
  if (apiClient.useMock) {
    await delay(200)
    const user = getUserById(userId)
    if (!user) throw new Error('User not found')
    if (user.id === currentUser.id) {
      return { following: false, followers: user.followers }
    }
    const next = !user.followedByMe
    user.followedByMe = next
    user.followers += next ? 1 : -1
    currentUser.following += next ? 1 : -1
    return { following: user.followedByMe, followers: user.followers }
  }
  return apiClient.post(`/api/users/${userId}/follow`)
}

export async function updateProfile(patch: Partial<User>): Promise<User> {
  if (apiClient.useMock) {
    await delay(300)
    return { ...users[0], ...patch }
  }
  return apiClient.patch<User>('/api/users/me', patch)
}
