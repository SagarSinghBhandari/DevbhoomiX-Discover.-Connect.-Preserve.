import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'

export function LocationBadge({ label }: { label: string }) {
  return (
    <Badge variant="outline" className="gap-1 font-normal">
      <MapPin className="h-3 w-3" aria-hidden />
      {label}
    </Badge>
  )
}
