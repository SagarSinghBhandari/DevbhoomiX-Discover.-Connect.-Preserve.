import { Badge } from '@/components/ui/badge'
import type { ContentOrigin } from '@/types'
import { Sparkles } from 'lucide-react'

const labels: Record<ContentOrigin, string> = {
  COMMUNITY_SUBMITTED: 'Community Submitted',
  VERIFIED: 'Source Verified',
  OFFICIAL: 'Official',
  AI_SUGGESTED: 'AI Suggested',
}

const variants: Record<ContentOrigin, 'secondary' | 'accent' | 'saffron' | 'outline'> = {
  COMMUNITY_SUBMITTED: 'secondary',
  VERIFIED: 'accent',
  OFFICIAL: 'saffron',
  AI_SUGGESTED: 'outline',
}

export function AIInsightBadge({
  origin,
  label,
}: {
  origin?: ContentOrigin
  label?: 'AI-generated' | 'AI-assisted' | 'Source Verified'
}) {
  if (label) {
    return (
      <Badge variant={label === 'Source Verified' ? 'accent' : 'outline'} className="gap-1">
        {label !== 'Source Verified' ? <Sparkles className="h-3 w-3" /> : null}
        {label}
      </Badge>
    )
  }
  if (!origin) return null
  return (
    <Badge variant={variants[origin]} className="gap-1">
      {origin === 'AI_SUGGESTED' ? <Sparkles className="h-3 w-3" /> : null}
      {labels[origin]}
    </Badge>
  )
}
