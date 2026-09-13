import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { ArticleCard } from '@/components/knowledge/ArticleCard'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useArticles } from '@/hooks/use-articles'
import { ARTICLE_TYPES, DISTRICTS } from '@/lib/constants'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export function KnowledgePage() {
  const { data, isLoading, isError, refetch } = useArticles()
  const [type, setType] = useState('all')
  const [district, setDistrict] = useState('all')
  const filtered = useMemo(
    () =>
      (data?.items ?? []).filter((a) => {
        if (a.status !== 'PUBLISHED' && type !== 'all') return a.type === type
        if (type !== 'all' && a.type !== type) return false
        if (district !== 'all' && a.district !== district) return false
        return a.status === 'PUBLISHED' || type !== 'all'
      }),
    [data, type, district],
  )
  const published = filtered.filter((a) => a.status === 'PUBLISHED' || type !== 'all')

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onRetry={() => void refetch()} />

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge library"
        title="Articles, research, oral histories"
        description="Topic, district, author and content type — a magazine desk for the state."
        actions={
          <Button asChild>
            <Link to="/create/article">Write an article</Link>
          </Button>
        }
      />
      <Tabs value={type} onValueChange={setType}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          {ARTICLE_TYPES.map((t) => (
            <TabsTrigger key={t} value={t}>
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Select value={district} onValueChange={setDistrict}>
        <SelectTrigger className="max-w-xs" aria-label="District">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All districts</SelectItem>
          {DISTRICTS.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {published.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {published.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      ) : (
        <EmptyState title="No articles in this shelf" actionLabel="Write one" actionTo="/create/article" />
      )}
    </div>
  )
}
