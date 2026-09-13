import type { ISODateTime, UUID } from './common'

export type MediaKind = 'IMAGE' | 'VIDEO' | 'DOCUMENT'

export type MediaAsset = {
  id: UUID
  kind: MediaKind
  url: string
  thumbnailUrl?: string
  caption?: string
  alt?: string
  width?: number
  height?: number
  createdAt: ISODateTime
}

export type UploadPayload = {
  fileName: string
  contentType: string
  kind: MediaKind
}
