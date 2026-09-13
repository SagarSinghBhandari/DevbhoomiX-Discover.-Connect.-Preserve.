import type { District, GeoPoint, ISODateTime, Region, UUID } from './common'
import type { MediaAsset } from './media'

export type PlaceCategory =
  | 'Mountains'
  | 'Valleys'
  | 'Rivers'
  | 'Lakes'
  | 'Temples'
  | 'Heritage'
  | 'Villages'
  | 'Wildlife'
  | 'Trekking'
  | 'Cultural Sites'

export type Place = {
  id: UUID
  slug: string
  name: string
  locality: string
  district: District
  region: Region
  category: PlaceCategory
  coordinates: GeoPoint
  description: string
  history: string
  culture: string
  elevationM?: number
  gallery: MediaAsset[]
  nearbyPlaceIds: UUID[]
  relatedIssueIds: UUID[]
  relatedStoryIds: UUID[]
  tags: string[]
  popularity: number
  createdAt: ISODateTime
}

export type DistrictSummary = {
  name: District
  region: Region
  issueCount: number
  placeCount: number
  coordinates: GeoPoint
}
