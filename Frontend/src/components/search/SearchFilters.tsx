import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DISTRICTS, ISSUE_CATEGORIES, REGIONS } from '@/lib/constants'
import type { SearchFilters as Filters } from '@/types'

export function SearchFilters({
  value,
  onChange,
}: {
  value: Filters
  onChange: (v: Filters) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div className="space-y-1">
        <Label>District</Label>
        <Select value={value.district ?? 'all'} onValueChange={(v) => onChange({ ...value, district: v === 'all' ? undefined : (v as Filters['district']) })}>
          <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All districts</SelectItem>
            {DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Region</Label>
        <Select value={value.region ?? 'all'} onValueChange={(v) => onChange({ ...value, region: v === 'all' ? undefined : v })}>
          <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All regions</SelectItem>
            {REGIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Category</Label>
        <Select value={value.category ?? 'all'} onValueChange={(v) => onChange({ ...value, category: v === 'all' ? undefined : v })}>
          <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {ISSUE_CATEGORIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Sort</Label>
        <Select value={value.sort ?? 'recent'} onValueChange={(v) => onChange({ ...value, sort: v as Filters['sort'] })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
