import { likePost } from '@/api/posts.api'
import { FollowButton } from '@/components/community/FollowButton'
import { LocationBadge } from '@/components/common/LocationBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatRelative } from '@/lib/utils'
import type { Post } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export function PostCard({ post }: { post: Post }) {
  const qc = useQueryClient()
  const like = useMutation({
    mutationFn: () => likePost(post.id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return (
    <article className="rounded-xl border bg-card p-5">
      <header className="flex items-start gap-3">
        <Link to={`/profile/${post.author.username}`}>
          <Avatar>
            <AvatarImage src={post.author.avatarUrl} alt="" />
            <AvatarFallback>{post.author.displayName[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/profile/${post.author.username}`} className="font-medium">
              {post.author.displayName}
            </Link>
            <Badge variant="outline">{post.type}</Badge>
            {post.locationLabel ? <LocationBadge label={post.locationLabel} /> : null}
          </div>
          <p className="text-xs text-muted-foreground">{formatRelative(post.createdAt)}</p>
        </div>
        <FollowButton user={post.author} />
      </header>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{post.content}</p>
      {post.media[0] ? (
        <img
          src={post.media[0].url}
          alt={post.media[0].alt || ''}
          className="mt-3 max-h-80 w-full rounded-lg object-cover"
          loading="lazy"
        />
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`} className="text-xs text-accent">
            #{tag}
          </Link>
        ))}
      </div>
      <footer className="mt-4 flex items-center gap-1 text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          aria-label="Like"
          onClick={() => like.mutate()}
          className={post.likedByMe ? 'text-destructive' : ''}
        >
          <Heart className={post.likedByMe ? 'fill-current' : ''} /> {post.likeCount}
        </Button>
        <Button variant="ghost" size="sm" aria-label="Comments">
          <MessageCircle /> {post.commentCount}
        </Button>
        <Button variant="ghost" size="sm" aria-label="Save" onClick={() => toast.success('Saved to bookmarks')}>
          <Bookmark className={post.savedByMe ? 'fill-current' : ''} />
        </Button>
        <Button variant="ghost" size="sm" aria-label="Share" onClick={() => toast.success('Link copied (mock)')}>
          <Share2 />
        </Button>
      </footer>
    </article>
  )
}
