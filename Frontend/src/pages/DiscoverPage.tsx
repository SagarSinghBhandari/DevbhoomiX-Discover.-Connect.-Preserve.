import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { IssueCard } from '@/components/issues/IssueCard'
import { ArticleCard } from '@/components/knowledge/ArticleCard'
import { PlaceMap } from '@/components/maps/PlaceMap'
import { PlaceCard } from '@/components/places/PlaceCard'
import { SearchBar } from '@/components/search/SearchBar'
import { SearchFilters } from '@/components/search/SearchFilters'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDebounce } from '@/hooks/use-debounce'
import { useArticles } from '@/hooks/use-articles'
import { useIssues } from '@/hooks/use-issues'
import { useCultureItems, usePlaces } from '@/hooks/use-locations'
import { usePosts } from '@/hooks/use-posts'
import type { SearchFilters as Filters } from '@/types'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const tabs = ['all', 'places', 'culture', 'heritage', 'food', 'people', 'stories', 'issues', 'knowledge'] as const

export function DiscoverPage() {
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState<Filters>({ sort: 'recent' })
  const dq = useDebounce(q, 250)
  const placesQ = usePlaces()
  const issuesQ = useIssues()
  const articlesQ = useArticles()
  const cultureQ = useCultureItems()
  const postsQ = usePosts()

  const loading = placesQ.isLoading || issuesQ.isLoading || articlesQ.isLoading
  const error = placesQ.isError || issuesQ.isError

  const needle = dq.toLowerCase()
  const places = useMemo(() => {
    return (placesQ.data ?? []).filter((p) => {
      const match =
        !needle ||
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle))
      const district = !filters.district || p.district === filters.district
      const category = !filters.category || p.category === filters.category
      return match && district && category
    })
  }, [placesQ.data, needle, filters])

  const issues = (issuesQ.data?.items ?? []).filter(
    (i) =>
      (!needle || i.title.toLowerCase().includes(needle)) &&
      (!filters.district || i.district === filters.district),
  )
  const articles = (articlesQ.data?.items ?? []).filter(
    (a) => !needle || a.title.toLowerCase().includes(needle),
  )
  const culture = (cultureQ.data ?? []).filter(
    (c) => !needle || c.title.toLowerCase().includes(needle) || c.kind.includes(needle),
  )
  const stories = (postsQ.data?.items ?? []).filter(
    (p) => !needle || p.content.toLowerCase().includes(needle),
  )

  return (
    <div>
      <PageHeader
        eyebrow="Discover"
        title="Search the living landscape"
        description="Places, people, traditions, issues and stories — editorial cards with an interactive map."
      />
      <div className="space-y-4">
        <SearchBar value={q} onChange={setQ} />
        <SearchFilters value={filters} onChange={setFilters} />
      </div>
      {loading ? <LoadingState className="mt-8" /> : null}
      {error ? <ErrorState className="mt-8" onRetry={() => void placesQ.refetch()} /> : null}
      {!loading && !error ? (
        <Tabs defaultValue="all" className="mt-8">
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t} value={t} className="capitalize">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all">
            <PlaceMap places={places} height={360} />
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {places.slice(0, 6).map((p) => (
                <PlaceCard key={p.id} place={p} />
              ))}
            </div>
            {!places.length ? <EmptyState title="No places match" className="mt-6" /> : null}
          </TabsContent>
          <TabsContent value="places">
            <PlaceMap places={places} height={360} />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {places.map((p) => (
                <PlaceCard key={p.id} place={p} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="culture">
            <CultureGrid items={culture.filter((c) => c.kind === 'community' || c.kind === 'craft')} />
          </TabsContent>
          <TabsContent value="heritage">
            <CultureGrid items={culture.filter((c) => c.kind === 'architecture' || c.kind === 'heritage' || c.kind === 'festival')} />
          </TabsContent>
          <TabsContent value="food">
            <CultureGrid items={culture.filter((c) => c.kind === 'food')} />
          </TabsContent>
          <TabsContent value="people">
            <p className="text-sm text-muted-foreground">
              People live on profiles.{' '}
              <Link to="/search?q=meera" className="underline">
                Open search
              </Link>
            </p>
          </TabsContent>
          <TabsContent value="stories">
            <div className="grid gap-4 md:grid-cols-2">
              {stories.map((s) => (
                <p key={s.id} className="rounded-xl border p-4 text-sm">
                  {s.content}
                </p>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="issues">
            <div className="grid gap-4 md:grid-cols-2">
              {issues.map((i) => (
                <IssueCard key={i.id} issue={i} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="knowledge">
            <div className="grid gap-4 md:grid-cols-2">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : null}
    </div>
  )
}

function CultureGrid({ items }: { items: { id: string; slug: string; title: string; history: string; gallery: { url: string }[] }[] }) {
  if (!items.length) return <EmptyState title="Nothing in this tab" />
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((c) => (
        <Link key={c.id} to={`/culture/${c.slug}`} className="overflow-hidden rounded-xl border">
          <img src={c.gallery[0]?.url} alt="" className="h-36 w-full object-cover" />
          <div className="p-4">
            <p className="font-serif text-lg">{c.title}</p>
            <p className="line-clamp-2 text-sm text-muted-foreground">{c.history}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
