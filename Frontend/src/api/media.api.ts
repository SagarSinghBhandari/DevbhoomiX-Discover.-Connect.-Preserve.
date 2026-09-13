import { delay } from '@/lib/utils'
import type { MediaAsset, UploadPayload } from '@/types'
import { apiClient } from './client'

export async function uploadMedia(payload: UploadPayload): Promise<MediaAsset> {
  if (apiClient.useMock) {
    await delay(350)
    return {
      id: crypto.randomUUID(),
      kind: payload.kind,
      url: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80`,
      alt: payload.fileName,
      createdAt: new Date().toISOString(),
    }
  }
  return apiClient.post('/api/media', payload)
}
