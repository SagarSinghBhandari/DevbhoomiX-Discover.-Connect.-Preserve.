import { PeopleToFollow } from '@/components/community/PeopleToFollow'
import { ReelStrip } from '@/components/community/ReelCard'
import { ReelViewer } from '@/components/community/ReelViewer'
import { EmptyState } from '@/components/common/EmptyState'
import { PageHeader } from '@/components/common/PageHeader'
import { PostCard } from '@/components/posts/PostCard'
import { PostComposer } from '@/components/posts/PostComposer'
import { PostFeed } from '@/components/posts/PostFeed'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCurrentUser } from '@/hooks/use-auth'
import { usePosts } from '@/hooks/use-posts'
import { useReels } from '@/hooks/use-reels'
import { POST_TYPES } from '@/lib/constants'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function CommunityPage() {
  const [open, setOpen] = useState(false)
  const [activeReelId, setActiveReelId] = useState<string | null>(null)
  const { data } = usePosts()
  const { data: me } = useCurrentUser()
  const { data: reels = [] } = useReels()
  const followingPosts = (data?.items ?? []).filter((p) => p.author.followedByMe && p.author.id !== me?.id)

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Community"
        title="A knowledge-oriented public square"
        description="Follow contributors, watch field reels, then discuss, ask and document."
        actions={
          <Button onClick={() => setOpen((v) => !v)} variant="outline">
            {open ? 'Close composer' : 'Start a post'}
          </Button>
        }
      />
      {open ? (
        <div className="rounded-xl border p-4">
          <PostComposer />
        </div>
      ) : null}
      <ReelStrip reels={reels} onOpen={setActiveReelId} />
      {activeReelId ? <ReelViewer reels={reels} startId={activeReelId} onClose={() => setActiveReelId(null)} /> : null}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <Tabs defaultValue="all">
            <TabsList className="flex-wrap">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              {POST_TYPES.map((t) => (
                <TabsTrigger key={t} value={t}>
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all">
              <PostFeed />
            </TabsContent>
            <TabsContent value="following">
              {followingPosts.length ? (
                <div className="space-y-4">
                  {followingPosts.map((p) => (
                    <PostCard key={p.id} post={p} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="You are not following anyone yet"
                  description="Follow contributors from the rail or from a post to fill this feed."
                />
              )}
            </TabsContent>
            {POST_TYPES.map((t) => (
              <TabsContent key={t} value={t}>
                <div className="space-y-4">
                  {(data?.items ?? [])
                    .filter((p) => p.type === t)
                    .map((p) => (
                      <PostCard key={p.id} post={p} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Prefer a full editor? <Link to="/create/post">Open compose page</Link>
          </p>
        </div>
        <div className="lg:sticky lg:top-20 lg:self-start">
          <PeopleToFollow />
        </div>
      </div>
    </div>
  )
}
