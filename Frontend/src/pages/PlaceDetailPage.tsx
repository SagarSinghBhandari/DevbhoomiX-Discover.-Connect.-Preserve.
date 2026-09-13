import { ImageGallery } from '@/components/common/ImageGallery'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { IssueCard } from '@/components/issues/IssueCard'
import { MapView } from '@/components/maps/MapView'
import { PlaceHero } from '@/components/places/PlaceHero'
import { useIssues } from '@/hooks/use-issues'
import { usePlace, usePlaces } from '@/hooks/use-locations'
import { usePosts } from '@/hooks/use-posts'
import { Link, useParams } from 'react-router-dom'

export function PlaceDetailPage() {
  const { slug = '' } = useParams()
  const { data, isLoading, isError, refetch } = usePlace(slug)
  const allPlaces = usePlaces()
  const issuesQ = useIssues()
  const postsQ = usePosts()
  if (isLoading) return <LoadingState />
  if (isError || !data) return <ErrorState message="Place not found" onRetry={() => void refetch()} />

  const nearby = (allPlaces.data ?? []).filter((p) => data.nearbyPlaceIds.includes(p.id))
  const relatedIssues = (issuesQ.data?.items ?? []).filter((i) => data.relatedIssueIds.includes(i.id))
  const stories = (postsQ.data?.items ?? []).filter((p) => data.relatedStoryIds.includes(p.id))

  return (
    <div className="space-y-8">
      <PlaceHero place={data} />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6 text-[17px] leading-8">
          <p>{data.description}</p>
          <section>
            <h2 className="font-serif text-2xl">History</h2>
            <p className="mt-2">{data.history}</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl">Culture</h2>
            <p className="mt-2">{data.culture}</p>
          </section>
          <ImageGallery items={data.gallery} />
          {stories.length ? (
            <section>
              <h2 className="font-serif text-2xl">Stories</h2>
              <ul className="mt-2 space-y-2 text-sm">
                {stories.map((s) => (
                  <li key={s.id} className="rounded-lg border p-3">
                    {s.content}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {relatedIssues.length ? (
            <section>
              <h2 className="mb-3 font-serif text-2xl">Related issues</h2>
              <div className="grid gap-3">
                {relatedIssues.map((i) => (
                  <IssueCard key={i.id} issue={i} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <aside className="space-y-4">
          <dl className="space-y-2 rounded-xl border p-4 text-sm">
            <div>
              <dt className="text-muted-foreground">District</dt>
              <dd>{data.district}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Coordinates</dt>
              <dd>
                {data.coordinates.latitude.toFixed(3)}, {data.coordinates.longitude.toFixed(3)}
              </dd>
            </div>
          </dl>
          <MapView
            height={240}
            markers={[
              {
                id: data.id,
                lat: data.coordinates.latitude,
                lng: data.coordinates.longitude,
                title: data.name,
              },
            ]}
          />
          <div>
            <h2 className="font-serif text-lg">Nearby</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {nearby.map((p) => (
                <li key={p.id}>
                  <Link to={`/places/${p.slug}`} className="underline">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
