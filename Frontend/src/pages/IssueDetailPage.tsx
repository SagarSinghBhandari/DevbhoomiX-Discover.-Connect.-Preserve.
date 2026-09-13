import { getIssueComments, supportIssue } from '@/api/issues.api'
import { AIInsightBadge } from '@/components/common/AIInsightBadge'
import { ConfidenceIndicator } from '@/components/common/ConfidenceIndicator'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { LocationBadge } from '@/components/common/LocationBadge'
import { IssueEvidenceGallery } from '@/components/issues/IssueEvidenceGallery'
import { IssueSeverityBadge } from '@/components/issues/IssueSeverityBadge'
import { IssueStatusBadge } from '@/components/issues/IssueStatusBadge'
import { IssueTimeline } from '@/components/issues/IssueTimeline'
import { MapView } from '@/components/maps/MapView'
import { CommentSection } from '@/components/posts/CommentSection'
import { Button } from '@/components/ui/button'
import { useIssue } from '@/hooks/use-issues'
import { formatDate } from '@/lib/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Flag, Share2, ThumbsUp } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export function IssueDetailPage() {
  const { id = '' } = useParams()
  const { data, isLoading, isError, refetch } = useIssue(id)
  const commentsQ = useQuery({
    queryKey: ['issue-comments', id],
    queryFn: () => getIssueComments(id),
    enabled: Boolean(id),
  })
  const qc = useQueryClient()
  const support = useMutation({
    mutationFn: () => supportIssue(id),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ['issue', id] }),
  })

  if (isLoading) return <LoadingState />
  if (isError || !data) return <ErrorState message="Issue not found" onRetry={() => void refetch()} />

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <IssueStatusBadge status={data.status} />
          <IssueSeverityBadge severity={data.severity} />
          <AIInsightBadge origin={data.origin} />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl">{data.title}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <LocationBadge label={`${data.locality}, ${data.district}`} />
          <span>{data.category}</span>
          <span>Reporter: {data.reporter.displayName}</span>
          <span>{formatDate(data.createdAt)}</span>
          {data.officialReferenceId ? <span>Ref {data.officialReferenceId}</span> : null}
        </div>
        <p className="text-[17px] leading-8">{data.description}</p>
        <IssueEvidenceGallery items={data.evidence} />
        <MapView
          height={280}
          markers={[
            {
              id: data.id,
              lat: data.coordinates.latitude,
              lng: data.coordinates.longitude,
              title: data.title,
            },
          ]}
        />
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => support.mutate()} variant={data.supportedByMe ? 'secondary' : 'default'}>
            <ThumbsUp /> Support ({data.supportCount})
          </Button>
          <Button variant="outline" onClick={() => toast.success('Share link copied (mock)')}>
            <Share2 /> Share
          </Button>
          <Button variant="ghost" onClick={() => toast.message('Report submitted to moderators (mock)')}>
            <Flag /> Report
          </Button>
        </div>
        <section>
          <h2 className="mb-3 font-serif text-xl">Suggested solutions</h2>
          <div className="space-y-3">
            {data.suggestedSolutions.map((s) => (
              <article key={s.id} className="rounded-lg border p-4">
                <div className="mb-2 flex flex-wrap gap-2">
                  <AIInsightBadge origin={s.origin} />
                </div>
                <h3 className="font-medium">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                {s.confidence != null ? (
                  <div className="mt-3">
                    <ConfidenceIndicator value={s.confidence} />
                  </div>
                ) : null}
              </article>
            ))}
            {!data.suggestedSolutions.length ? (
              <p className="text-sm text-muted-foreground">No solutions yet.</p>
            ) : null}
          </div>
        </section>
        <CommentSection comments={commentsQ.data ?? []} />
      </div>
      <aside className="space-y-6">
        <section className="rounded-xl border p-4">
          <h2 className="mb-3 font-serif text-lg">Timeline</h2>
          <IssueTimeline events={data.timeline} />
        </section>
        <section>
          <h2 className="font-serif text-lg">Related issues</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {data.relatedIssueIds.map((rid) => (
              <li key={rid}>
                <Link to={`/issues/${rid}`} className="underline">
                  {rid}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  )
}
