import { z } from 'zod'

export const AnnouncementCategorySchema = z.enum([
  'release',
  'partner',
  'launch',
  'campaign',
  'protocol',
])

export const AnnouncementSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  url: z.string(),
  datePublished: z.string(),
  tags: z.array(z.string()).optional(),
  category: AnnouncementCategorySchema,
})

export type AnnouncementCategory = z.infer<typeof AnnouncementCategorySchema>
export type Announcement = z.infer<typeof AnnouncementSchema>
