import { AIInsightBadge } from '@/components/common/AIInsightBadge'
import { formatDate } from '@/lib/utils'
import type { IssueTimelineEvent } from '@/types'

const order = ['REPORTED', 'VERIFIED', 'AUTHORITY_NOTIFIED', 'WORK_STARTED', 'RESOLVED'] as const

export function IssueTimeline({ events }: { events: IssueTimelineEvent[] }) {
  return (
    <ol className="space-y-4 border-l pl-4">
      {order.map((kind) => {
        const event = events.find((e) => e.kind === kind)
        return (
          <li key={kind} className="relative">
            <span className={`absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full ${event ? 'bg-primary' : 'bg-border'}`} />
            <p className="text-sm font-medium">{kind.replaceAll('_', ' ')}</p>
            {event ? (
              <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                <p>{event.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <AIInsightBadge origin={event.origin} />
                  <span>
                    {event.actorName} · {formatDate(event.createdAt)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Pending</p>
            )}
          </li>
        )
      })}
    </ol>
  )
}
