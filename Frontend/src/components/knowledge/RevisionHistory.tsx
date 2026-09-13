import { formatDate } from '@/lib/utils'
import type { ArticleRevision } from '@/types'

export function RevisionHistory({ revisions }: { revisions: ArticleRevision[] }) {
  return (
    <section>
      <h2 className="font-serif text-xl">Revision history</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {revisions.map((r) => (
          <li key={r.id} className="rounded-md border p-3">
            v{r.version} · {r.summary} · {r.editorName} · {formatDate(r.createdAt)}
          </li>
        ))}
      </ul>
    </section>
  )
}
