import type { Reel } from '@/types'
import { Play, Volume2 } from 'lucide-react'

export function ReelCard({
  reel,
  onOpen,
}: {
  reel: Reel
  onOpen: (id: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(reel.id)}
      className="group relative aspect-[9/16] w-[148px] shrink-0 overflow-hidden rounded-xl text-left sm:w-[168px]"
      aria-label={`Play reel by ${reel.author.displayName}`}
    >
      <img
        src={reel.posterUrl}
        alt=""
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />
      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
        <Play className="h-3 w-3 fill-current" /> Reel
      </span>
      <Volume2 className="absolute right-2 top-2 h-3.5 w-3.5 text-white/80" />
      <div className="absolute inset-x-0 bottom-0 p-2.5 text-white">
        <p className="truncate text-xs font-medium">{reel.author.displayName}</p>
        <p className="mt-0.5 line-clamp-2 text-[11px] text-white/85">{reel.caption}</p>
      </div>
    </button>
  )
}

export function ReelStrip({
  reels,
  onOpen,
}: {
  reels: Reel[]
  onOpen: (id: string) => void
}) {
  if (!reels.length) return null
  return (
    <section aria-label="Reels">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-saffron">Reels</p>
          <h2 className="font-serif text-2xl">Stories from the hills</h2>
        </div>
        <button type="button" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => onOpen(reels[0].id)}>
          Watch all
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reels.map((reel) => (
          <ReelCard key={reel.id} reel={reel} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}
