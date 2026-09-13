import { Badge } from '@/components/ui/badge'
import type { IssueStatus } from '@/types'

const map: Record<IssueStatus, { label: string; variant: 'outline' | 'secondary' | 'accent' | 'saffron' | 'destructive' | 'default' }> = {
  REPORTED: { label: 'Reported', variant: 'outline' },
  UNDER_REVIEW: { label: 'Under review', variant: 'secondary' },
  VERIFIED: { label: 'Verified', variant: 'accent' },
  IN_PROGRESS: { label: 'In progress', variant: 'saffron' },
  RESOLVED: { label: 'Resolved', variant: 'default' },
  REJECTED: { label: 'Rejected', variant: 'destructive' },
}

export function IssueStatusBadge({ status }: { status: IssueStatus }) {
  const item = map[status]
  return <Badge variant={item.variant}>{item.label}</Badge>
}
