import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search places, people, traditions, issues, stories…',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="relative block">
      <span className="sr-only">Search</span>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 pl-10"
      />
    </label>
  )
}
