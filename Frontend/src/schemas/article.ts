import { ARTICLE_TYPES } from '@/lib/constants'
import { z } from 'zod'

export const articleSchema = z.object({
  title: z.string().min(8, 'Title is required'),
  subtitle: z.string().min(8, 'Add a short subtitle'),
  type: z.enum(ARTICLE_TYPES),
  topic: z.string().min(2),
  tags: z.string().min(2, 'Add comma-separated tags'),
  district: z.string().optional(),
  coverUrl: z.string().url('Cover must be a URL').or(z.literal('')),
  body: z.string().min(40, 'Write at least a short article'),
  references: z.string().optional(),
})

export type ArticleValues = z.infer<typeof articleSchema>
