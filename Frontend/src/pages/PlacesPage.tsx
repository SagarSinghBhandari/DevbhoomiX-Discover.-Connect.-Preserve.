import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { PlaceMap } from '@/components/maps/PlaceMap'
import { PlaceCard } from '@/components/places/PlaceCard'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePlaces } from '@/hooks/use-locations'
import { PLACE_CATEGORIES } from '@/lib/constants'
import { useMemo, useState } from 'react'

export function PlacesPage() {
  const { data, isLoading, isError, refetch } = usePlaces()
  const [cat, setCat] = useState('all')
  const filtered = useMemo(
    () => (data ?? []).filter((p) => cat === 'all' || p.category === cat),
    [data, cat],
  )
  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onRetry={() => void refetch()} />

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Places"
        title="Mountains, valleys, rivers and living towns"
        description="Interactive map and editorial cards across thirteen districts."
      />
      <PlaceMap places={filtered} height={400} />
      <Tabs value={cat} onValueChange={setCat}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          {PLACE_CATEGORIES.map((c) => (
            <TabsTrigger key={c} value={c}>
              {c}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      ) : (
        <EmptyState title="No places in this category" />
      )}
    </div>
  )
}
