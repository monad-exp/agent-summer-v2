import { z } from 'zod'

export const AnnouncementTagSchema = z.enum(['Release', 'Partner', 'Launch', 'Campaign'])

export const AnnouncementSchema = z.object({
  id: z.string(),
  date: z.string(),
  tag: AnnouncementTagSchema,
  title: z.string(),
  body: z.string(),
})

export type AnnouncementTag = z.infer<typeof AnnouncementTagSchema>
export type Announcement = z.infer<typeof AnnouncementSchema>
