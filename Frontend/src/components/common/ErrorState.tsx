import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export function ErrorState({
  message = 'Something went wrong.',
  onRetry,
  className,
}: {
  message?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div role="alert" className={`flex flex-col items-center rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center ${className ?? ''}`}>
      <AlertCircle className="mb-2 h-6 w-6 text-destructive" />
      <p className="text-sm">{message}</p>
      {onRetry ? (
        <Button variant="outline" className="mt-3" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}
