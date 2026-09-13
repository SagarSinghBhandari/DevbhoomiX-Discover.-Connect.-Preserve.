import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}

export function PageHeader({ eyebrow, title, description, actions, className }: Props) {
  return (
    <header className={cn('mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-3xl space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">{eyebrow}</p>
        ) : null}
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">{title}</h1>
        {description ? <p className="text-muted-foreground">{description}</p> : null}
      </div>
      {actions}
    </header>
  )
}
