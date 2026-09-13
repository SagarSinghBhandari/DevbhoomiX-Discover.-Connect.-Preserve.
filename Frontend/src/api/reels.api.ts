import { delay } from '@/lib/utils'
import { getReelById, reels } from '@/mocks/reels'
import type { Reel } from '@/types'
import { apiClient } from './client'

export async function getReels(): Promise<Reel[]> {
  if (apiClient.useMock) {
    await delay(240)
    return reels
  }
  return apiClient.get('/api/reels')
}

export async function getReel(id: string): Promise<Reel> {
  if (apiClient.useMock) {
    await delay(180)
    const reel = getReelById(id)
    if (!reel) throw new Error('Reel not found')
    return reel
  }
  return apiClient.get(`/api/reels/${id}`)
}

export async function likeReel(id: string): Promise<{ liked: boolean; likeCount: number }> {
  if (apiClient.useMock) {
    await delay(120)
    const reel = getReelById(id)
    if (!reel) throw new Error('Reel not found')
    reel.likedByMe = !reel.likedByMe
    reel.likeCount += reel.likedByMe ? 1 : -1
    return { liked: reel.likedByMe, likeCount: reel.likeCount }
  }
  return apiClient.post(`/api/reels/${id}/like`)
}

export async function saveReel(id: string): Promise<{ saved: boolean }> {
  if (apiClient.useMock) {
    await delay(120)
    const reel = getReelById(id)
    if (!reel) throw new Error('Reel not found')
    reel.savedByMe = !reel.savedByMe
    return { saved: reel.savedByMe }
  }
  return apiClient.post(`/api/reels/${id}/save`)
}
