import { FollowButton } from '@/components/community/FollowButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCurrentUser } from '@/hooks/use-auth'
import { getUsers } from '@/api/users.api'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export function PeopleToFollow() {
  const { data: me } = useCurrentUser()
  const { data: users } = useQuery({ queryKey: ['users'], queryFn: getUsers })
  const suggestions = (users ?? [])
    .filter((u) => u.id !== me?.id)
    .sort((a, b) => Number(a.followedByMe) - Number(b.followedByMe) || b.contributionScore - a.contributionScore)
    .slice(0, 5)

  if (!suggestions.length) return null

  return (
    <aside className="rounded-xl border bg-card p-4">
      <h2 className="font-serif text-lg">People to follow</h2>
      <p className="mb-4 text-xs text-muted-foreground">Contributors documenting Uttarakhand</p>
      <ul className="space-y-4">
        {suggestions.map((user) => (
          <li key={user.id} className="flex items-start gap-3">
            <Link to={`/profile/${user.username}`} className="shrink-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatarUrl} alt="" />
                <AvatarFallback>{user.displayName[0]}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="min-w-0 flex-1">
              <Link to={`/profile/${user.username}`} className="block truncate font-medium leading-tight">
                {user.displayName}
              </Link>
              <p className="truncate text-xs text-muted-foreground">{user.location}</p>
            </div>
            <FollowButton user={user} />
          </li>
        ))}
      </ul>
    </aside>
  )
}
