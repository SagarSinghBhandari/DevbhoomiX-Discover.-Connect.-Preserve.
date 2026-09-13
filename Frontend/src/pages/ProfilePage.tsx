import { getUser } from '@/api/users.api'
import { FollowButton } from '@/components/community/FollowButton'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { LocationBadge } from '@/components/common/LocationBadge'
import { IssueCard } from '@/components/issues/IssueCard'
import { ArticleCard } from '@/components/knowledge/ArticleCard'
import { PostCard } from '@/components/posts/PostCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useArticles } from '@/hooks/use-articles'
import { useIssues } from '@/hooks/use-issues'
import { usePosts } from '@/hooks/use-posts'
import { getBookmarks } from '@/api/bookmarks.api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export function ProfilePage() {
  const { username = '' } = useParams()
  const userQ = useQuery({ queryKey: ['user', username], queryFn: () => getUser(username) })
  const postsQ = usePosts()
  const articlesQ = useArticles()
  const issuesQ = useIssues()
  const savedQ = useQuery({ queryKey: ['bookmarks'], queryFn: getBookmarks })

  if (userQ.isLoading) return <LoadingState />
  if (userQ.isError || !userQ.data) return <ErrorState onRetry={() => void userQ.refetch()} />
  const user = userQ.data
  const posts = (postsQ.data?.items ?? []).filter((p) => p.author.id === user.id)
  const articles = (articlesQ.data?.items ?? []).filter((a) => a.author.id === user.id)
  const issues = (issuesQ.data?.items ?? []).filter((i) => i.reporter.id === user.id)

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border">
        <img src={user.coverUrl} alt="" className="h-48 w-full object-cover md:h-64" />
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
          <Avatar className="-mt-16 h-24 w-24 border-4 border-card">
            <AvatarImage src={user.avatarUrl} alt="" />
            <AvatarFallback>{user.displayName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="font-serif text-3xl">{user.displayName}</h1>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
            <p className="mt-2 max-w-xl text-sm">{user.bio}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              <LocationBadge label={user.location} />
              <span>Score {user.contributionScore}</span>
              <span>{user.followers} followers</span>
              <span>{user.following} following</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.interests.map((i) => (
                <span key={i} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                  {i}
                </span>
              ))}
            </div>
          </div>
          <FollowButton user={user} size="default" />
        </div>
      </div>
      <Tabs defaultValue="posts" className="mt-8">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="space-y-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </TabsContent>
        <TabsContent value="articles" className="grid gap-4 md:grid-cols-2">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </TabsContent>
        <TabsContent value="issues" className="grid gap-4 md:grid-cols-2">
          {issues.map((i) => (
            <IssueCard key={i.id} issue={i} />
          ))}
        </TabsContent>
        <TabsContent value="contributions">
          <p className="text-sm text-muted-foreground">
            {posts.length} posts · {articles.length} articles · {issues.length} issues · score {user.contributionScore}
          </p>
        </TabsContent>
        <TabsContent value="saved" className="space-y-4">
          {(savedQ.data?.posts ?? []).map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
