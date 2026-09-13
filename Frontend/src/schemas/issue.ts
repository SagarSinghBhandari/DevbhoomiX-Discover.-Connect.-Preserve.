import { ISSUE_CATEGORIES, ISSUE_SEVERITIES } from '@/lib/constants'
import { z } from 'zod'

export const createIssueSchema = z.object({
  title: z.string().min(12, 'Give the issue a clear title').max(140),
  description: z.string().min(40, 'Describe what is happening and who is affected'),
  locality: z.string().min(2, 'Add a locality'),
  district: z.string().min(2),
  latitude: z.number().min(28).max(32),
  longitude: z.number().min(77).max(82),
  category: z.enum(ISSUE_CATEGORIES),
  severity: z.enum(ISSUE_SEVERITIES),
  evidenceUrls: z.string().optional(),
})

export type CreateIssueValues = z.infer<typeof createIssueSchema>
