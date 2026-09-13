import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Inbox } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
  className?: string
}

export function EmptyState({ title, description, actionLabel, actionTo, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 px-6 py-16 text-center',
        className,
      )}
    >
      <Inbox className="mb-3 h-8 w-8 text-muted-foreground" aria-hidden />
      <h2 className="font-serif text-xl">{title}</h2>
      {description ? <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p> : null}
      {actionLabel && actionTo ? (
        <Button asChild className="mt-4">
          <Link to={actionTo}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  )
}
