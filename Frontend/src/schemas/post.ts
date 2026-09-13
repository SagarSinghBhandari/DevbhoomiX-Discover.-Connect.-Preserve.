import { POST_TYPES } from '@/lib/constants'
import { z } from 'zod'

export const postSchema = z.object({
  type: z.enum(POST_TYPES),
  content: z.string().min(12, 'Write a little more'),
  tags: z.string().optional(),
  district: z.string().optional(),
})

export type PostValues = z.infer<typeof postSchema>
