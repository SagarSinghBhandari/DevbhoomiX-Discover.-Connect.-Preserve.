import { LocationBadge } from '@/components/common/LocationBadge'
import type { Place } from '@/types'

export function PlaceHero({ place }: { place: Place }) {
  return (
    <section className="relative overflow-hidden rounded-2xl">
      <img src={place.gallery[0]?.url} alt="" className="h-72 w-full object-cover md:h-96" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
      <div className="absolute bottom-0 p-6 text-white">
        <p className="text-xs uppercase tracking-[0.18em] text-white/80">{place.category}</p>
        <h1 className="font-serif text-4xl">{place.name}</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          <LocationBadge label={`${place.locality}, ${place.district}`} />
          {place.elevationM ? <span className="text-sm">{place.elevationM} m</span> : null}
        </div>
      </div>
    </section>
  )
}
