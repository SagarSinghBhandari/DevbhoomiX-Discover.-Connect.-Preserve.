import type { Issue } from '@/types'
import { MapView } from './MapView'

export function IssueMap({ issues, height = 420 }: { issues: Issue[]; height?: number }) {
  return (
    <MapView
      height={height}
      markers={issues.map((i) => ({
        id: i.id,
        lat: i.coordinates.latitude,
        lng: i.coordinates.longitude,
        title: i.title,
        subtitle: `${i.category} · ${i.locality}`,
        href: `/issues/${i.id}`,
      }))}
    />
  )
}
