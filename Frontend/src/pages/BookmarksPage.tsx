import { getBookmarks } from '@/api/bookmarks.api'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { IssueCard } from '@/components/issues/IssueCard'
import { ArticleCard } from '@/components/knowledge/ArticleCard'
import { PlaceCard } from '@/components/places/PlaceCard'
import { PostCard } from '@/components/posts/PostCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQuery } from '@tanstack/react-query'

export function BookmarksPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: getBookmarks,
  })
  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onRetry={() => void refetch()} />
  if (!data) return <EmptyState title="No bookmarks" />

  return (
    <div>
      <PageHeader eyebrow="Saved" title="Bookmarks" description="Posts, articles, places and issues." />
      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="places">Places</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="space-y-4">
          {data.posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </TabsContent>
        <TabsContent value="articles" className="grid gap-4 md:grid-cols-2">
          {data.articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </TabsContent>
        <TabsContent value="places" className="grid gap-4 md:grid-cols-2">
          {data.places.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </TabsContent>
        <TabsContent value="issues" className="grid gap-4 md:grid-cols-2">
          {data.issues.map((i) => (
            <IssueCard key={i.id} issue={i} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
