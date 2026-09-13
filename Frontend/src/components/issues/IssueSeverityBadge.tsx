import { Badge } from '@/components/ui/badge'
import type { IssueSeverity } from '@/types'

export function IssueSeverityBadge({ severity }: { severity: IssueSeverity }) {
  const variant = severity === 'CRITICAL' || severity === 'HIGH' ? 'destructive' : 'secondary'
  return <Badge variant={variant}>{severity}</Badge>
}
