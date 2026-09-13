import { Badge } from '@/components/ui/badge'
import type { AgentCitation } from '@/types'
import { Link } from 'react-router-dom'

export function SourceCitation({ citation }: { citation: AgentCitation }) {
  const inner = (
    <article className="rounded-lg border bg-card p-3 text-sm">
      <div className="mb-1 flex items-center gap-2">
        <p className="font-medium">{citation.title}</p>
        {citation.verified ? <Badge variant="accent">Source Verified</Badge> : null}
      </div>
      <p className="text-xs text-muted-foreground">{citation.source}</p>
      <p className="mt-1 text-muted-foreground">{citation.snippet}</p>
    </article>
  )
  return citation.href ? <Link to={citation.href}>{inner}</Link> : inner
}
