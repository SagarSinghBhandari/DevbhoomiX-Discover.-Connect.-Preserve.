import { markAllNotificationsRead, markNotificationRead } from '@/api/notifications.api'
import { updateProfile } from '@/api/users.api'
import { PageHeader } from '@/components/common/PageHeader'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useCurrentUser } from '@/hooks/use-auth'
import { useNotifications } from '@/hooks/use-notifications'
import { formatRelative } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export function SettingsPage() {
  const { data: user } = useCurrentUser()
  const { data: notes } = useNotifications()
  const qc = useQueryClient()
  const [bio, setBio] = useState(user?.bio ?? '')
  const save = useMutation({
    mutationFn: () => updateProfile({ bio }),
    onSuccess: () => toast.success('Profile updated (mock)'),
  })
  const readAll = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => void qc.invalidateQueries({ queryKey: ['notifications'] }),
  })

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <PageHeader eyebrow="Account" title="Settings" />
      <section className="space-y-3">
        <h2 className="font-serif text-xl">Profile</h2>
        <div className="space-y-2">
          <Label htmlFor="name">Display name</Label>
          <Input id="name" defaultValue={user?.displayName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <Button onClick={() => save.mutate()}>Save</Button>
      </section>
      <section className="space-y-3">
        <h2 className="font-serif text-xl">Appearance</h2>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <span className="text-sm">Dark mode</span>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <span className="text-sm">Email digest (mock)</span>
          <Switch defaultChecked />
        </div>
      </section>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl">Notifications</h2>
          <Button size="sm" variant="outline" onClick={() => readAll.mutate()}>
            Mark all read
          </Button>
        </div>
        <ul className="space-y-2">
          {(notes ?? []).map((n) => (
            <li key={n.id}>
              <Link
                to={n.href}
                className={`block rounded-lg border p-3 text-sm ${n.read ? '' : 'bg-muted/50'}`}
                onClick={() => void markNotificationRead(n.id)}
              >
                <p className="font-medium">{n.title}</p>
                <p className="text-muted-foreground">{n.body}</p>
                <p className="text-xs text-muted-foreground">{formatRelative(n.createdAt)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
