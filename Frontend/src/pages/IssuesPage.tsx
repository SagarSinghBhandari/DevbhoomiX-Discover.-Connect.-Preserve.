import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { IssueCard } from '@/components/issues/IssueCard'
import { IssueMap } from '@/components/maps/IssueMap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useIssues } from '@/hooks/use-issues'
import { DISTRICTS, ISSUE_CATEGORIES, ISSUE_STATUSES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { CircleCheck, Clock3, MapPin, Megaphone, Search, TriangleAlert } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function IssuesPage() {
  const { data, isLoading, isError, refetch } = useIssues()
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [district, setDistrict] = useState('all')
  const [q, setQ] = useState('')

  const items = useMemo(() => data?.items ?? [], [data?.items])
  const openCount = items.filter((i) => i.status !== 'RESOLVED' && i.status !== 'REJECTED').length
  const resolvedCount = items.filter((i) => i.status === 'RESOLVED').length
  const inProgress = items.filter((i) => i.status === 'IN_PROGRESS').length
  const districtsTouched = new Set(items.map((i) => i.district)).size

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return items.filter((i) => {
      if (category !== 'all' && i.category !== category) return false
      if (status !== 'all' && i.status !== status) return false
      if (district !== 'all' && i.district !== district) return false
      if (
        needle &&
        !i.title.toLowerCase().includes(needle) &&
        !i.locality.toLowerCase().includes(needle) &&
        !i.district.toLowerCase().includes(needle)
      ) {
        return false
      }
      return true
    })
  }, [items, category, status, district, q])

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onRetry={() => void refetch()} />

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border bg-primary text-primary-foreground">
        <div className="grid gap-8 p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              Hyperlocal civic desk
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
              Report. Rally. Resolve Uttarakhand.
            </h1>
            <p className="mt-4 max-w-xl text-primary-foreground/80">
              A public issue tracker for roads, water, fire, schools and last-mile healthcare — community submitted,
              verified, then sent to the desk that can act.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/create/issue">
                  <Megaphone /> Report an issue
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <a href="#issue-list">Browse issues</a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Stat icon={TriangleAlert} label="Open issues" value={openCount} />
            <Stat icon={Clock3} label="In progress" value={inProgress} />
            <Stat icon={CircleCheck} label="Resolved" value={resolvedCount} />
            <Stat icon={MapPin} label="Districts" value={districtsTouched} />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-saffron">Map</p>
            <h2 className="font-serif text-2xl">Where people are raising their voice</h2>
          </div>
        </div>
        <IssueMap issues={filtered} height={380} />
      </section>

      <section id="issue-list" className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-saffron">Feed</p>
          <h2 className="font-serif text-2xl">Civic issues near you</h2>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search locality, district or title…"
            className="h-12 pl-10"
            aria-label="Search issues"
          />
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto pb-1">
          <Chip active={category === 'all'} onClick={() => setCategory('all')}>
            All
          </Chip>
          {ISSUE_CATEGORIES.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Chip>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger aria-label="Status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {ISSUE_STATUSES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c.replaceAll('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger aria-label="District">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All districts</SelectItem>
              {DISTRICTS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">{filtered.length} issues</p>
        {filtered.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((i) => (
              <IssueCard key={i.id} issue={i} />
            ))}
          </div>
        ) : (
          <EmptyState title="No issues match these filters" actionLabel="Report one" actionTo="/create/issue" />
        )}
      </section>
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof TriangleAlert
  label: string
  value: number
}) {
  return (
    <div className="rounded-2xl bg-primary-foreground/10 p-4">
      <Icon className="h-4 w-4 text-primary-foreground/80" />
      <p className="mt-3 font-serif text-3xl">{value}</p>
      <p className="text-xs text-primary-foreground/70">{label}</p>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full border px-3 py-1.5 text-sm',
        active ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
      )}
    >
      {children}
    </button>
  )
}
