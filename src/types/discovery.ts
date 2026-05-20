import { z } from 'zod'

export const DiscoveryCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  handle: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  version: z.string(),
  thumbKey: z.string(),
})

export type DiscoveryCard = z.infer<typeof DiscoveryCardSchema>
