import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-auth'
import { useFollow } from '@/hooks/use-follow'
import { cn } from '@/lib/utils'
import type { User } from '@/types'
import { UserMinus, UserPlus } from 'lucide-react'

export function FollowButton({
  user,
  size = 'sm',
  className,
}: {
  user: User
  size?: 'sm' | 'default'
  className?: string
}) {
  const { data: me } = useCurrentUser()
  const follow = useFollow(user.id, user.displayName)
  if (me?.id === user.id) return null

  return (
    <Button
      type="button"
      size={size}
      variant={user.followedByMe ? 'outline' : 'default'}
      className={cn('shrink-0', className)}
      aria-pressed={user.followedByMe}
      aria-label={user.followedByMe ? `Unfollow ${user.displayName}` : `Follow ${user.displayName}`}
      disabled={follow.isPending}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        follow.mutate()
      }}
    >
      {user.followedByMe ? <UserMinus /> : <UserPlus />}
      {user.followedByMe ? 'Following' : 'Follow'}
    </Button>
  )
}
