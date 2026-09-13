import { AIInsightBadge } from '@/components/common/AIInsightBadge'
import { IssueSeverityBadge } from '@/components/issues/IssueSeverityBadge'
import { IssueStatusBadge } from '@/components/issues/IssueStatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate, formatRelative } from '@/lib/utils'
import type { Issue } from '@/types'
import { MapPin, MessageCircle, ThumbsUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const fallbackCover: Record<string, string> = {
  Roads: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  Water: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  Waste: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=80',
  Environment: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  Disaster: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  Healthcare: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80',
  Education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  Tourism: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  Employment: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
}

export function IssueCard({ issue }: { issue: Issue }) {
  const cover =
    issue.evidence[0]?.url ||
    fallbackCover[issue.category] ||
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80'

  return (
    <article className="group overflow-hidden rounded-2xl border bg-card shadow-[0_1px_0_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/issues/${issue.id}`} className="relative block">
        <img src={cover} alt="" className="h-44 w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <IssueStatusBadge status={issue.status} />
          <IssueSeverityBadge severity={issue.severity} />
        </div>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs text-white">
          <MapPin className="h-3 w-3" />
          {issue.locality}, {issue.district}
        </span>
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
            {issue.category}
          </span>
          <AIInsightBadge origin={issue.origin} />
        </div>
        <Link to={`/issues/${issue.id}`} className="block font-serif text-xl leading-snug group-hover:underline">
          {issue.title}
        </Link>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{issue.description}</p>
        <div className="flex items-center justify-between border-t pt-3">
          <Link to={`/profile/${issue.reporter.username}`} className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={issue.reporter.avatarUrl} alt="" />
              <AvatarFallback>{issue.reporter.displayName[0]}</AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <p className="text-xs font-medium">{issue.reporter.displayName}</p>
              <p className="text-[11px] text-muted-foreground">
                {formatRelative(issue.createdAt)} · {formatDate(issue.createdAt)}
              </p>
            </div>
          </Link>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <ThumbsUp className="h-3.5 w-3.5" /> {issue.supportCount}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" /> {issue.commentsCount}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
