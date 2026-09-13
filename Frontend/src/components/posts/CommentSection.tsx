import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { formatRelative } from '@/lib/utils'
import type { Comment } from '@/types'
import { useState } from 'react'
import { toast } from 'sonner'

export function CommentSection({ comments }: { comments: Comment[] }) {
  const [body, setBody] = useState('')
  return (
    <section className="space-y-4" aria-label="Discussion">
      <h2 className="font-serif text-xl">Discussion</h2>
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault()
          toast.success('Comment added (mock)')
          setBody('')
        }}
      >
        <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Add a comment" />
        <Button type="submit" size="sm">
          Comment
        </Button>
      </form>
      <ul className="space-y-3">
        {comments.map((c) => (
          <li key={c.id} className="flex gap-3 rounded-lg border p-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={c.author.avatarUrl} alt="" />
              <AvatarFallback>{c.author.displayName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                {c.author.displayName}{' '}
                <span className="font-normal text-muted-foreground">{formatRelative(c.createdAt)}</span>
              </p>
              <p className="text-sm">{c.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
