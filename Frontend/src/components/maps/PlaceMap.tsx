import type { Place } from '@/types'
import { MapView } from './MapView'

export function PlaceMap({ places, height = 420 }: { places: Place[]; height?: number }) {
  return (
    <MapView
      height={height}
      markers={places.map((p) => ({
        id: p.id,
        lat: p.coordinates.latitude,
        lng: p.coordinates.longitude,
        title: p.name,
        subtitle: `${p.category} · ${p.district}`,
        href: `/places/${p.slug}`,
      }))}
    />
  )
}
