import type { MediaAsset } from '@/types'
import { useState } from 'react'

export function ImageGallery({ items }: { items: MediaAsset[] }) {
  const [active, setActive] = useState(0)
  if (!items.length) return null
  const current = items[Math.min(active, items.length - 1)]
  return (
    <div className="space-y-3">
      <img
        src={current.url}
        alt={current.alt || current.caption || 'Gallery image'}
        className="aspect-[16/9] w-full rounded-xl object-cover"
        loading="lazy"
      />
      {current.caption ? <p className="text-sm text-muted-foreground">{current.caption}</p> : null}
      {items.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-md border ${i === active ? 'ring-2 ring-ring' : ''}`}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={item.thumbnailUrl || item.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
