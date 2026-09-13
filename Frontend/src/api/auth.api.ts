import { delay } from '@/lib/utils'
import { currentUser } from '@/mocks/users'
import type { AuthSession, LoginPayload, RegisterPayload, User } from '@/types'
import { apiClient } from './client'

const mockSession = (): AuthSession => ({
  user: currentUser,
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
})

export async function login(payload: LoginPayload): Promise<AuthSession> {
  if (apiClient.useMock) {
    await delay(400)
    if (!payload.email || !payload.password) {
      throw new Error('Email and password are required')
    }
    return mockSession()
  }
  return apiClient.post<AuthSession>('/api/auth/login', payload)
}

export async function register(payload: RegisterPayload): Promise<AuthSession> {
  if (apiClient.useMock) {
    await delay(500)
    return {
      ...mockSession(),
      user: { ...currentUser, email: payload.email, username: payload.username, displayName: payload.displayName },
    }
  }
  return apiClient.post<AuthSession>('/api/auth/register', payload)
}

export async function requestPasswordReset(email: string): Promise<{ ok: boolean }> {
  if (apiClient.useMock) {
    await delay(400)
    return { ok: Boolean(email) }
  }
  return apiClient.post('/api/auth/forgot-password', { email })
}

export async function getCurrentUser(): Promise<User> {
  if (apiClient.useMock) {
    await delay(200)
    return currentUser
  }
  return apiClient.get<User>('/api/auth/me')
}

export async function logout(): Promise<void> {
  if (apiClient.useMock) {
    await delay(150)
    return
  }
  await apiClient.post('/api/auth/logout')
}
