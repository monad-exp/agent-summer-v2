import { z } from 'zod'

export const DiscoveryAppSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  websiteUrl: z.string(),
  logoUrl: z.string(),
  categories: z.array(z.string()).min(1),
  skillMdUrl: z.string(),
  skillsCount: z.number().int().nonnegative(),
  verifiedAt: z.string().optional(),
})

export type DiscoveryApp = z.infer<typeof DiscoveryAppSchema>
