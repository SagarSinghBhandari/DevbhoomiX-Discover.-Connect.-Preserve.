import { LocationBadge } from '@/components/common/LocationBadge'
import { Badge } from '@/components/ui/badge'
import type { Place } from '@/types'
import { Link } from 'react-router-dom'

export function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="overflow-hidden rounded-xl border bg-card">
      <Link to={`/places/${place.slug}`}>
        <img src={place.gallery[0]?.url} alt="" className="h-44 w-full object-cover" loading="lazy" />
      </Link>
      <div className="space-y-2 p-4">
        <Badge variant="outline">{place.category}</Badge>
        <Link to={`/places/${place.slug}`} className="block font-serif text-lg hover:underline">
          {place.name}
        </Link>
        <LocationBadge label={`${place.locality}, ${place.district}`} />
        <p className="line-clamp-2 text-sm text-muted-foreground">{place.description}</p>
      </div>
    </article>
  )
}
