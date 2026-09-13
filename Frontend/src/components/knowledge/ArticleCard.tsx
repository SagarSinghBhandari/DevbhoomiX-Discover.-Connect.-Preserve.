import { LocationBadge } from '@/components/common/LocationBadge'
import { formatDate } from '@/lib/utils'
import type { Article } from '@/types'
import { Link } from 'react-router-dom'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group overflow-hidden rounded-xl border bg-card">
      <Link to={`/knowledge/${article.slug}`}>
        <img src={article.cover.url} alt="" className="h-44 w-full object-cover" loading="lazy" />
      </Link>
      <div className="space-y-2 p-5">
        <p className="text-xs uppercase tracking-wide text-saffron">{article.type}</p>
        <Link to={`/knowledge/${article.slug}`} className="font-serif text-xl leading-snug group-hover:underline">
          {article.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{article.subtitle}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{article.author.displayName}</span>
          {article.publishedAt ? <span>{formatDate(article.publishedAt)}</span> : null}
          <span>{article.readingTimeMin} min</span>
          {article.district ? <LocationBadge label={article.district} /> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((t) => (
            <span key={t} className="text-xs text-accent">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
