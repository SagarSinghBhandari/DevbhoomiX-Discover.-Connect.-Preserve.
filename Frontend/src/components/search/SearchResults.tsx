import { ArticleCard } from '@/components/knowledge/ArticleCard'
import { IssueCard } from '@/components/issues/IssueCard'
import { PlaceCard } from '@/components/places/PlaceCard'
import { PostCard } from '@/components/posts/PostCard'
import { EmptyState } from '@/components/common/EmptyState'
import type { SearchResults as Results } from '@/types'
import { Link } from 'react-router-dom'

export function SearchResults({ results, tab }: { results: Results; tab: string }) {
  const empty =
    !results.people.length &&
    !results.posts.length &&
    !results.issues.length &&
    !results.articles.length &&
    !results.places.length &&
    !results.culture.length
  if (empty) return <EmptyState title="No matches" description="Try another district, tag or spelling." />

  return (
    <div className="space-y-8">
      {(tab === 'all' || tab === 'people') && results.people.length ? (
        <section>
          <h2 className="mb-3 font-serif text-xl">People</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {results.people.map((u) => (
              <li key={u.id}>
                <Link to={`/profile/${u.username}`} className="block rounded-lg border p-3">
                  <p className="font-medium">{u.displayName}</p>
                  <p className="text-sm text-muted-foreground">{u.bio}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {(tab === 'all' || tab === 'posts') && results.posts.length ? (
        <section className="space-y-3">
          <h2 className="font-serif text-xl">Posts</h2>
          {results.posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </section>
      ) : null}
      {(tab === 'all' || tab === 'issues') && results.issues.length ? (
        <section>
          <h2 className="mb-3 font-serif text-xl">Issues</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {results.issues.map((i) => (
              <IssueCard key={i.id} issue={i} />
            ))}
          </div>
        </section>
      ) : null}
      {(tab === 'all' || tab === 'articles') && results.articles.length ? (
        <section>
          <h2 className="mb-3 font-serif text-xl">Articles</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {results.articles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      ) : null}
      {(tab === 'all' || tab === 'places') && results.places.length ? (
        <section>
          <h2 className="mb-3 font-serif text-xl">Places</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {results.places.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </section>
      ) : null}
      {(tab === 'all' || tab === 'culture' || tab === 'heritage') && results.culture.length ? (
        <section>
          <h2 className="mb-3 font-serif text-xl">Culture & heritage</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {results.culture.map((c) => (
              <li key={c.id}>
                <Link to={`/culture/${c.slug}`} className="block rounded-lg border p-3">
                  <p className="font-medium">{c.title}</p>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{c.history}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {(tab === 'all' || tab === 'tags') && results.tags.length ? (
        <section>
          <h2 className="mb-3 font-serif text-xl">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {results.tags.map((t) => (
              <Link key={t} to={`/search?q=${encodeURIComponent(t)}`} className="rounded-full border px-3 py-1 text-sm">
                #{t}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
