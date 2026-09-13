import { searchEverything } from '@/api/search.api'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { SearchBar } from '@/components/search/SearchBar'
import { SearchFilters } from '@/components/search/SearchFilters'
import { SearchResults } from '@/components/search/SearchResults'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDebounce } from '@/hooks/use-debounce'
import { POPULAR_SEARCHES } from '@/lib/constants'
import type { SearchFilters as Filters } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const tabs = ['all', 'people', 'posts', 'issues', 'articles', 'places', 'culture', 'heritage', 'tags'] as const

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [tab, setTab] = useState('all')
  const [filters, setFilters] = useState<Filters>({ sort: 'recent' })
  const [recent, setRecent] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('uk-recent-searches') || '[]') as string[]
    } catch {
      return []
    }
  })
  const dq = useDebounce(q, 300)

  useEffect(() => {
    setParams(dq ? { q: dq } : {})
  }, [dq, setParams])

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['search', dq, filters],
    queryFn: () => searchEverything(dq, filters),
    enabled: dq.length > 1,
  })

  function commit(value: string) {
    setQ(value)
    if (value.trim()) {
      const next = [value, ...recent.filter((r) => r !== value)].slice(0, 6)
      setRecent(next)
      localStorage.setItem('uk-recent-searches', JSON.stringify(next))
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Search" title="People, posts, issues, articles, places" />
      <SearchBar value={q} onChange={commit} />
      <SearchFilters value={filters} onChange={setFilters} />
      {!dq ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-medium">Recent</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {recent.map((r) => (
                <li key={r}>
                  <button type="button" className="underline" onClick={() => commit(r)}>
                    {r}
                  </button>
                </li>
              ))}
              {!recent.length ? <li className="text-muted-foreground">No recent searches</li> : null}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-medium">Popular</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    className="rounded-full border px-3 py-1 text-sm"
                    onClick={() => commit(s)}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      {isFetching ? <LoadingState rows={2} /> : null}
      {isError ? <ErrorState onRetry={() => void refetch()} /> : null}
      {data && !isFetching ? (
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex-wrap">
            {tabs.map((t) => (
              <TabsTrigger key={t} value={t} className="capitalize">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4">
            <SearchResults results={data} tab={tab} />
          </div>
        </Tabs>
      ) : null}
    </div>
  )
}
