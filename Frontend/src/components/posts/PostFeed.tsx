import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PostCard } from '@/components/posts/PostCard'
import { usePosts } from '@/hooks/use-posts'

export function PostFeed() {
  const { data, isLoading, isError, refetch } = usePosts()
  if (isLoading) return <LoadingState rows={4} />
  if (isError) return <ErrorState onRetry={() => void refetch()} />
  if (!data?.items.length) return <EmptyState title="No discussions yet" actionLabel="Start one" actionTo="/create/post" />
  return (
    <div className="space-y-4">
      {data.items.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
