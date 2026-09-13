import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/badge'
import { useCultureItems } from '@/hooks/use-locations'
import { Link } from 'react-router-dom'

const groups: { title: string; kinds: string[] }[] = [
  { title: 'Communities', kinds: ['community'] },
  { title: 'Crafts & textiles', kinds: ['craft'] },
  { title: 'Festivals', kinds: ['festival'] },
  { title: 'Music & dance', kinds: ['music'] },
  { title: 'Food', kinds: ['food'] },
  { title: 'Architecture & heritage', kinds: ['architecture', 'heritage'] },
]

export function CulturePage() {
  const { data, isLoading, isError, refetch } = useCultureItems()
  if (isLoading) return <LoadingState rows={4} />
  if (isError) return <ErrorState onRetry={() => void refetch()} />
  if (!data?.length) return <EmptyState title="Archive empty" />

  return (
    <div>
      <PageHeader
        eyebrow="Culture & heritage"
        title="A living archive of the hills"
        description="Garhwali, Kumaoni, Jaunsari and Bhotia worlds — crafts, festivals, food, music and architecture."
      />
      <div className="space-y-12">
        {groups.map((g) => {
          const items = data.filter((i) => g.kinds.includes(i.kind))
          if (!items.length) return null
          return (
            <section key={g.title}>
              <h2 className="mb-4 font-serif text-2xl">{g.title}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Link key={item.id} to={`/culture/${item.slug}`} className="overflow-hidden rounded-xl border bg-card">
                    <img src={item.gallery[0]?.url} alt="" className="h-40 w-full object-cover" />
                    <div className="space-y-2 p-4">
                      <div className="flex gap-2">
                        <Badge variant="saffron">{item.kind}</Badge>
                        {item.community ? <Badge variant="outline">{item.community}</Badge> : null}
                      </div>
                      <h3 className="font-serif text-xl">{item.title}</h3>
                      <p className="line-clamp-3 text-sm text-muted-foreground">{item.culturalSignificance}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
