import { z } from 'zod'

export const CampaignStatusSchema = z.enum(['live', 'upcoming', 'ended'])

export const FeaturedCampaignSchema = z.object({
  id: z.string(),
  number: z.number(),
  host: z.string(),
  title: z.string(),
  blurb: z.string(),
  status: CampaignStatusSchema,
  prizePool: z.string(),
  prizeToken: z.string(),
  window: z.object({ start: z.string(), end: z.string() }),
  format: z.string(),
  requiredSkill: z.string(),
  endsAt: z.date(),
})

export const UpcomingCampaignSchema = z.object({
  date: z.string(),
})

export type CampaignStatus = z.infer<typeof CampaignStatusSchema>
export type FeaturedCampaign = z.infer<typeof FeaturedCampaignSchema>
export type UpcomingCampaign = z.infer<typeof UpcomingCampaignSchema>
