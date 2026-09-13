import { ImageGallery } from '@/components/common/ImageGallery'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { LocationBadge } from '@/components/common/LocationBadge'
import { Badge } from '@/components/ui/badge'
import { useCultureItem, usePlaces } from '@/hooks/use-locations'
import { usePosts } from '@/hooks/use-posts'
import { Link, useParams } from 'react-router-dom'

export function CultureDetailPage() {
  const { slug = '' } = useParams()
  const { data, isLoading, isError, refetch } = useCultureItem(slug)
  const placesQ = usePlaces()
  const postsQ = usePosts()
  if (isLoading) return <LoadingState />
  if (isError || !data) return <ErrorState onRetry={() => void refetch()} message="Culture item not found" />

  const relatedPlaces = (placesQ.data ?? []).filter((p) => data.relatedPlaceIds.includes(p.id))
  const stories = (postsQ.data?.items ?? []).filter((p) => data.relatedStoryIds.includes(p.id))

  return (
    <article className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl">
        <img src={data.gallery[0]?.url} alt="" className="h-80 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <p className="text-xs uppercase tracking-[0.18em]">{data.kind}</p>
          <h1 className="font-serif text-4xl">{data.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.community ? <Badge variant="secondary">{data.community}</Badge> : null}
            <LocationBadge label={data.district ? `${data.region} · ${data.district}` : data.region} />
          </div>
        </div>
      </section>
      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6 text-[17px] leading-8">
          <section>
            <h2 className="font-serif text-2xl">History</h2>
            <p className="mt-2">{data.history}</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl">Cultural significance</h2>
            <p className="mt-2">{data.culturalSignificance}</p>
          </section>
          <ImageGallery items={data.gallery} />
          {stories.length ? (
            <section>
              <h2 className="font-serif text-2xl">Community stories</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {stories.map((s) => (
                  <li key={s.id} className="rounded-lg border p-3">
                    {s.content}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <aside className="space-y-6">
          <section>
            <h2 className="font-serif text-lg">Related places</h2>
            <ul className="mt-2 space-y-2 text-sm">
              {relatedPlaces.map((p) => (
                <li key={p.id}>
                  <Link to={`/places/${p.slug}`} className="underline">
                    {p.name}
                  </Link>
                </li>
              ))}
              {!relatedPlaces.length ? <li className="text-muted-foreground">None linked yet.</li> : null}
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-lg">Sources</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {data.sources.map((s) => (
                <li key={s.title}>
                  {s.title} — {s.source}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </article>
  )
}
