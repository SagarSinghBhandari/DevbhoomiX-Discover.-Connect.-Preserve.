import { createIssue } from '@/api/issues.api'
import { PageHeader } from '@/components/common/PageHeader'
import { LocationPicker } from '@/components/maps/LocationPicker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { DISTRICTS, ISSUE_CATEGORIES, ISSUE_SEVERITIES, UK_CENTER } from '@/lib/constants'
import { createIssueSchema, type CreateIssueValues } from '@/schemas/issue'
import type { District, IssueCategory, IssueSeverity } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const steps = ['Title', 'Description', 'Location', 'Category', 'Severity', 'Evidence', 'Review']

export function CreateIssuePage() {
  const [step, setStep] = useState(0)
  const nav = useNavigate()
  const form = useForm<CreateIssueValues>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: '',
      description: '',
      locality: '',
      district: 'Pauri Garhwal',
      latitude: UK_CENTER.lat,
      longitude: UK_CENTER.lng,
      category: 'Roads',
      severity: 'MEDIUM',
      evidenceUrls: '',
    },
  })
  const mutation = useMutation({
    mutationFn: (v: CreateIssueValues) =>
      createIssue({
        title: v.title,
        description: v.description,
        category: v.category as IssueCategory,
        severity: v.severity as IssueSeverity,
        district: v.district as District,
        locality: v.locality,
        latitude: v.latitude,
        longitude: v.longitude,
        evidenceUrls: v.evidenceUrls
          ? v.evidenceUrls.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      }),
    onSuccess: (issue) => {
      toast.success('Issue submitted')
      nav(`/issues/${issue.id}`)
    },
  })
  const values = form.watch()
  const pct = ((step + 1) / steps.length) * 100

  async function next() {
    const fields: (keyof CreateIssueValues)[][] = [
      ['title'],
      ['description'],
      ['locality', 'district', 'latitude', 'longitude'],
      ['category'],
      ['severity'],
      [],
      [],
    ]
    const ok = await form.trigger(fields[step])
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Create" title="Report a civic issue" description="Title → evidence → review. Maps to createIssue()." />
      <p className="mb-2 text-sm text-muted-foreground">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>
      <Progress value={pct} className="mb-6" />
      <form className="space-y-4" onSubmit={form.handleSubmit((v) => mutation.mutate(v))}>
        {step === 0 ? (
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...form.register('title')} />
            <p className="text-xs text-destructive">{form.formState.errors.title?.message}</p>
          </div>
        ) : null}
        {step === 1 ? (
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={8} {...form.register('description')} />
            <p className="text-xs text-destructive">{form.formState.errors.description?.message}</p>
          </div>
        ) : null}
        {step === 2 ? (
          <div className="space-y-3">
            <Label htmlFor="locality">Locality</Label>
            <Input id="locality" {...form.register('locality')} />
            <Label>District</Label>
            <Select value={values.district} onValueChange={(v) => form.setValue('district', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DISTRICTS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <LocationPicker
              latitude={Number(values.latitude)}
              longitude={Number(values.longitude)}
              onChange={(lat, lng) => {
                form.setValue('latitude', lat)
                form.setValue('longitude', lng)
              }}
            />
            <p className="text-xs text-muted-foreground">
              {Number(values.latitude).toFixed(4)}, {Number(values.longitude).toFixed(4)}
            </p>
          </div>
        ) : null}
        {step === 3 ? (
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={values.category} onValueChange={(v) => form.setValue('category', v as IssueCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ISSUE_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}
        {step === 4 ? (
          <div className="space-y-2">
            <Label>Severity</Label>
            <Select value={values.severity} onValueChange={(v) => form.setValue('severity', v as IssueSeverity)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ISSUE_SEVERITIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}
        {step === 5 ? (
          <div className="space-y-2">
            <Label htmlFor="ev">Evidence image URLs (comma separated)</Label>
            <Textarea id="ev" {...form.register('evidenceUrls')} />
          </div>
        ) : null}
        {step === 6 ? (
          <div className="space-y-2 rounded-xl border p-4 text-sm">
            <p className="font-serif text-xl">{values.title}</p>
            <p>{values.description}</p>
            <p>
              {values.locality}, {values.district} · {values.category} · {values.severity}
            </p>
          </div>
        ) : null}
        <div className="flex gap-2">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          ) : null}
          {step < steps.length - 1 ? (
            <Button type="button" onClick={() => void next()}>
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Submitting…' : 'Submit'}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
