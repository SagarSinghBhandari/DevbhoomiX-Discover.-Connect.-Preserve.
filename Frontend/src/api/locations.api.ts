import { delay } from '@/lib/utils'
import { cultureItems, getCultureBySlug } from '@/mocks/culture'
import { districtSummaries, getPlaceBySlug, places } from '@/mocks/locations'
import type { CultureItem, DistrictSummary, Place } from '@/types'
import { apiClient } from './client'

export async function getPlaces(): Promise<Place[]> {
  if (apiClient.useMock) {
    await delay(240)
    return places
  }
  return apiClient.get('/api/places')
}

export async function getPlace(slug: string): Promise<Place> {
  if (apiClient.useMock) {
    await delay(220)
    const place = getPlaceBySlug(slug)
    if (!place) throw new Error('Place not found')
    return place
  }
  return apiClient.get(`/api/places/${slug}`)
}

export async function getDistricts(): Promise<DistrictSummary[]> {
  if (apiClient.useMock) {
    await delay(160)
    return districtSummaries
  }
  return apiClient.get('/api/districts')
}

export async function getCultureItems(): Promise<CultureItem[]> {
  if (apiClient.useMock) {
    await delay(220)
    return cultureItems
  }
  return apiClient.get('/api/culture')
}

export async function getCultureItem(slug: string): Promise<CultureItem> {
  if (apiClient.useMock) {
    await delay(220)
    const item = getCultureBySlug(slug)
    if (!item) throw new Error('Culture item not found')
    return item
  }
  return apiClient.get(`/api/culture/${slug}`)
}
