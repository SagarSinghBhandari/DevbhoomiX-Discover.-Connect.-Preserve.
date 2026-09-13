import { Progress } from '@/components/ui/progress'

export function ConfidenceIndicator({ value }: { value: number }) {
  const pct = Math.round(value * 100)
  return (
    <div className="space-y-1" aria-label={`Confidence ${pct} percent`}>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>AI confidence</span>
        <span>{pct}%</span>
      </div>
      <Progress value={pct} />
    </div>
  )
}
