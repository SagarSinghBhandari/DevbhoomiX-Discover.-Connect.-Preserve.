import { createArticle, saveDraft } from '@/api/articles.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ARTICLE_TYPES, DISTRICTS } from '@/lib/constants'
import { articleSchema, type ArticleValues } from '@/schemas/article'
import type { ArticleType, District } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function toPayload(values: ArticleValues) {
  return {
    title: values.title,
    subtitle: values.subtitle,
    type: values.type as ArticleType,
    topic: values.topic,
    tags: values.tags.split(',').map((t) => t.trim()).filter(Boolean),
    district: (values.district || undefined) as District | undefined,
    coverUrl:
      values.coverUrl ||
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80',
    body: values.body.split('\n\n').map((text) => ({ kind: 'paragraph' as const, text })),
    references: values.references
      ? values.references.split('\n').filter(Boolean).map((line) => ({ title: line, source: 'Submitted' }))
      : [],
  }
}

export function ArticleEditor() {
  const nav = useNavigate()
  const [preview, setPreview] = useState(false)
  const form = useForm<ArticleValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      type: 'Articles',
      topic: 'Culture',
      tags: '',
      district: '',
      coverUrl: '',
      body: '',
      references: '',
    },
  })
  const submit = useMutation({
    mutationFn: (v: ArticleValues) => createArticle(toPayload(v)),
    onSuccess: (article) => {
      toast.success('Submitted for review')
      nav(`/knowledge/${article.slug}`)
    },
  })
  const draft = useMutation({
    mutationFn: (v: ArticleValues) => saveDraft(toPayload(v)),
    onSuccess: () => toast.success('Draft saved'),
  })
  const values = form.watch()

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <form className="space-y-4" onSubmit={form.handleSubmit((v) => submit.mutate(v))}>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...form.register('title')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input id="subtitle" {...form.register('subtitle')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={form.watch('type')} onValueChange={(v) => form.setValue('type', v as ArticleType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ARTICLE_TYPES.map((t) => (
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
          <Label htmlFor="cover">Cover image URL</Label>
          <Input id="cover" {...form.register('coverUrl')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="body">Rich text (paragraphs separated by a blank line)</Label>
          <Textarea id="body" rows={12} {...form.register('body')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input id="tags" {...form.register('tags')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="refs">References</Label>
          <Textarea id="refs" {...form.register('references')} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={form.handleSubmit((v) => draft.mutate(v))}>
            Save draft
          </Button>
          <Button type="button" variant="secondary" onClick={() => setPreview((p) => !p)}>
            Preview
          </Button>
          <Button type="submit">Submit for review</Button>
        </div>
      </form>
      {preview ? (
        <aside className="rounded-xl border bg-muted/30 p-4">
          <p className="text-xs uppercase text-saffron">Preview</p>
          <h2 className="font-serif text-2xl">{values.title || 'Untitled'}</h2>
          <p className="text-sm text-muted-foreground">{values.subtitle}</p>
          <div className="mt-4 whitespace-pre-wrap text-sm">{values.body}</div>
        </aside>
      ) : (
        <aside className="text-sm text-muted-foreground">
          Headings, quotes, images and videos can be added as structured blocks. This editor maps to createArticle(),
          saveDraft(), updateArticle() and publishArticle().
        </aside>
      )}
    </div>
  )
}
