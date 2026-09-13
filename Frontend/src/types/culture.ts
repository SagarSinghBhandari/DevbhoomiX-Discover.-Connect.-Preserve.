import type { District, ISODateTime, Region, UUID } from './common'
import type { MediaAsset } from './media'

export type CultureKind =
  | 'community'
  | 'craft'
  | 'festival'
  | 'food'
  | 'music'
  | 'architecture'
  | 'heritage'

export type CultureItem = {
  id: UUID
  slug: string
  title: string
  kind: CultureKind
  community?: 'Garhwali' | 'Kumaoni' | 'Jaunsari' | 'Bhotia'
  region: Region
  district?: District
  history: string
  culturalSignificance: string
  gallery: MediaAsset[]
  relatedPlaceIds: UUID[]
  relatedStoryIds: UUID[]
  sources: { title: string; source: string }[]
  tags: string[]
  createdAt: ISODateTime
}
