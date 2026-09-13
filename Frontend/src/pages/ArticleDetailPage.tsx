import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { ArticleReader } from '@/components/knowledge/ArticleReader'
import { RevisionHistory } from '@/components/knowledge/RevisionHistory'
import { CommentSection } from '@/components/posts/CommentSection'
import { useArticle, useArticles } from '@/hooks/use-articles'
import { comments } from '@/mocks/posts'
import { Link, useParams } from 'react-router-dom'

export function ArticleDetailPage() {
  const { slug = '' } = useParams()
  const { data, isLoading, isError, refetch } = useArticle(slug)
  const all = useArticles()
  if (isLoading) return <LoadingState />
  if (isError || !data) return <ErrorState message="Article not found" onRetry={() => void refetch()} />
  const related = (all.data?.items ?? []).filter((a) => data.relatedArticleIds.includes(a.id))

  return (
    <div className="space-y-10">
      <ArticleReader article={data} />
      <div className="mx-auto max-w-3xl space-y-8">
        <section>
          <h2 className="font-serif text-xl">Related</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {related.map((a) => (
              <li key={a.id}>
                <Link to={`/knowledge/${a.slug}`} className="underline">
                  {a.title}
                </Link>
              </li>
            ))}
            {data.relatedPlaceIds.map((id) => (
              <li key={id} className="text-muted-foreground">
                Place {id}
              </li>
            ))}
            {data.relatedIssueIds.map((id) => (
              <li key={id}>
                <Link to={`/issues/${id}`} className="underline">
                  Related issue
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <RevisionHistory revisions={data.revisions} />
        <CommentSection comments={comments.filter((c) => c.articleId === data.id)} />
      </div>
    </div>
  )
}
