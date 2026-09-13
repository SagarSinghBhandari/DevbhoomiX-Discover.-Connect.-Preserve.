import { delay } from '@/lib/utils'
import { notifications } from '@/mocks/notifications'
import type { Notification } from '@/types'
import { apiClient } from './client'

export async function getNotifications(): Promise<Notification[]> {
  if (apiClient.useMock) {
    await delay(200)
    return notifications
  }
  return apiClient.get('/api/notifications')
}

export async function markNotificationRead(id: string): Promise<Notification> {
  if (apiClient.useMock) {
    await delay(120)
    const item = notifications.find((n) => n.id === id)
    if (!item) throw new Error('Notification not found')
    item.read = true
    return item
  }
  return apiClient.patch(`/api/notifications/${id}`, { read: true })
}

export async function markAllNotificationsRead(): Promise<{ ok: boolean }> {
  if (apiClient.useMock) {
    await delay(150)
    notifications.forEach((n) => {
      n.read = true
    })
    return { ok: true }
  }
  return apiClient.post('/api/notifications/read-all')
}
