import { createPost } from '@/api/posts.api'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { DISTRICTS, POST_TYPES } from '@/lib/constants'
import { postSchema, type PostValues } from '@/schemas/post'
import type { District, PostType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function PostComposer() {
  const nav = useNavigate()
  const qc = useQueryClient()
  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: { type: 'Discussion', content: '', tags: '', district: '' },
  })
  const mutation = useMutation({
    mutationFn: (values: PostValues) =>
      createPost({
        type: values.type as PostType,
        content: values.content,
        tags: values.tags ? values.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        district: (values.district || undefined) as District | undefined,
        mediaUrls: [],
      }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Posted to the community')
      nav('/community')
    },
  })

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit((v) => mutation.mutate(v))}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={form.watch('type')} onValueChange={(v) => form.setValue('type', v as PostType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {POST_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>District</Label>
          <Select value={form.watch('district')} onValueChange={(v) => form.setValue('district', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              {DISTRICTS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">What do you want to document or discuss?</Label>
        <Textarea id="content" rows={6} {...form.register('content')} />
        {form.formState.errors.content ? (
          <p className="text-xs text-destructive">{form.formState.errors.content.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <input id="tags" className="flex h-10 w-full rounded-md border bg-card px-3 text-sm" {...form.register('tags')} />
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Publishing…' : 'Publish'}
      </Button>
    </form>
  )
}
