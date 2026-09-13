import { PageHeader } from '@/components/common/PageHeader'
import { IssueCard } from '@/components/issues/IssueCard'
import { ArticleCard } from '@/components/knowledge/ArticleCard'
import { PostCard } from '@/components/posts/PostCard'
import { useCurrentUser } from '@/hooks/use-auth'
import { useArticles } from '@/hooks/use-articles'
import { useIssues } from '@/hooks/use-issues'
import { usePosts } from '@/hooks/use-posts'

export function ContributionsPage() {
  const { data: user } = useCurrentUser()
  const posts = usePosts()
  const articles = useArticles()
  const issues = useIssues()
  const minePosts = (posts.data?.items ?? []).filter((p) => p.author.id === user?.id)
  const mineArticles = (articles.data?.items ?? []).filter((a) => a.author.id === user?.id)
  const mineIssues = (issues.data?.items ?? []).filter((i) => i.reporter.id === user?.id)

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="You"
        title="My contributions"
        description={`Score ${user?.contributionScore ?? 0} · posts, articles and civic reports.`}
      />
      <section className="space-y-3">
        <h2 className="font-serif text-xl">Posts</h2>
        {minePosts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </section>
      <section>
        <h2 className="mb-3 font-serif text-xl">Articles</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {mineArticles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 font-serif text-xl">Issues</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {mineIssues.map((i) => (
            <IssueCard key={i.id} issue={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
