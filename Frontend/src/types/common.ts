export type UUID = string
export type ISODateTime = string

export type District =
  | 'Dehradun'
  | 'Haridwar'
  | 'Nainital'
  | 'Almora'
  | 'Chamoli'
  | 'Pauri Garhwal'
  | 'Tehri Garhwal'
  | 'Rudraprayag'
  | 'Uttarkashi'
  | 'Pithoragarh'
  | 'Bageshwar'
  | 'Champawat'
  | 'Udham Singh Nagar'

export type Region = 'Garhwal' | 'Kumaon' | 'Jaunsar-Bawar' | 'Trans-Himalayan'

export type ContentOrigin =
  | 'COMMUNITY_SUBMITTED'
  | 'VERIFIED'
  | 'OFFICIAL'
  | 'AI_SUGGESTED'

export type Paginated<T> = {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type ApiError = {
  detail: string
  code?: string
}

export type GeoPoint = {
  latitude: number
  longitude: number
}

export type LocationMeta = {
  district: District
  region: Region
  locality?: string
  address?: string
} & GeoPoint
