import { FollowButton } from '@/components/community/FollowButton'
import { likeReel, saveReel } from '@/api/reels.api'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import type { Reel } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Bookmark, ChevronDown, ChevronUp, Heart, MessageCircle, Share2, Volume2, VolumeX, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export function ReelViewer({
  reels,
  startId,
  onClose,
}: {
  reels: Reel[]
  startId: string
  onClose: () => void
}) {
  const start = Math.max(0, reels.findIndex((r) => r.id === startId))
  const [index, setIndex] = useState(start)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const touchY = useRef<number | null>(null)
  const reel = reels[index]
  const qc = useQueryClient()

  const like = useMutation({
    mutationFn: () => likeReel(reel.id),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ['reels'] }),
  })
  const save = useMutation({
    mutationFn: () => saveReel(reel.id),
    onSuccess: (r) => {
      void qc.invalidateQueries({ queryKey: ['reels'] })
      toast.success(r.saved ? 'Saved' : 'Removed from saved')
    },
  })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, reels.length - 1))
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, reels.length])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.currentTime = 0
    void el.play().catch(() => undefined)
  }, [index])

  if (!reel) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Reels viewer"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-3 top-3 z-10 text-white hover:bg-white/10"
        onClick={onClose}
        aria-label="Close reels"
      >
        <X />
      </Button>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="hidden text-white sm:inline-flex"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          aria-label="Previous reel"
        >
          <ChevronUp />
        </Button>
        <div
          className="relative h-[100dvh] w-full overflow-hidden bg-black sm:h-[min(92vh,820px)] sm:w-[min(100%,420px)] sm:rounded-2xl"
          onTouchStart={(e) => {
            touchY.current = e.changedTouches[0]?.clientY ?? null
          }}
          onTouchEnd={(e) => {
            const startY = touchY.current
            touchY.current = null
            if (startY == null) return
            const delta = (e.changedTouches[0]?.clientY ?? startY) - startY
            if (delta < -48) setIndex((i) => Math.min(reels.length - 1, i + 1))
            if (delta > 48) setIndex((i) => Math.max(0, i - 1))
          }}
        >
          <video
            ref={videoRef}
            key={reel.id}
            className="h-full w-full object-cover"
            src={reel.videoUrl}
            poster={reel.posterUrl}
            muted={muted}
            loop
            playsInline
            autoPlay
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link to={`/profile/${reel.author.username}`} className="pointer-events-auto">
                    <Avatar className="h-9 w-9 ring-2 ring-white/40">
                      <AvatarImage src={reel.author.avatarUrl} alt="" />
                      <AvatarFallback>{reel.author.displayName[0]}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{reel.author.displayName}</p>
                    <p className="truncate text-xs text-white/70">{reel.locationLabel}</p>
                  </div>
                  <div className="pointer-events-auto">
                    <FollowButton
                      user={reel.author}
                      className="border-white/40 bg-white/15 text-white hover:bg-white/25 hover:text-white"
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed">{reel.caption}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/80">
                  {reel.tags.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </div>
              </div>
              <div className="pointer-events-auto flex flex-col items-center gap-3">
                <button
                  type="button"
                  className="flex flex-col items-center text-xs"
                  aria-label="Like reel"
                  onClick={() => like.mutate()}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                    <Heart className={reel.likedByMe ? 'fill-red-500 text-red-500' : ''} />
                  </span>
                  {reel.likeCount}
                </button>
                <button type="button" className="flex flex-col items-center text-xs" aria-label="Comments">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                    <MessageCircle />
                  </span>
                  {reel.commentCount}
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center text-xs"
                  aria-label="Save reel"
                  onClick={() => save.mutate()}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                    <Bookmark className={reel.savedByMe ? 'fill-current' : ''} />
                  </span>
                  Save
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center text-xs"
                  aria-label="Share reel"
                  onClick={() => toast.success('Reel link copied (mock)')}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                    <Share2 />
                  </span>
                  Share
                </button>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15"
                  aria-label={muted ? 'Unmute' : 'Mute'}
                  onClick={() => setMuted((m) => !m)}
                >
                  {muted ? <VolumeX /> : <Volume2 />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hidden text-white sm:inline-flex"
          disabled={index === reels.length - 1}
          onClick={() => setIndex((i) => Math.min(reels.length - 1, i + 1))}
          aria-label="Next reel"
        >
          <ChevronDown />
        </Button>
      </div>
    </div>
  )
}
