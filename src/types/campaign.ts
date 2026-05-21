import { z } from 'zod'

export const CampaignStatusSchema = z.enum(['upcoming', 'active', 'ended'])

export const CompetitionTypeSchema = z.enum([
  'game',
  'trading',
  'research',
  'security',
  'social',
  'development',
  'other',
])

export const EntryModeSchema = z.enum([
  'open',
  'allowlist',
  'invite_only',
  'qualification',
])

export const PrizeKindSchema = z.enum(['pool', 'fixed', 'sponsored', 'none'])

export const CampaignFieldSchema = z.object({
  label: z.string(),
  value: z.string(),
  kind: z.string().optional(),
})

export const CampaignSchema = z.object({
  id: z.string(),
  slug: z.string(),
  url: z.string(),
  title: z.string(),
  summary: z.string(),
  datePublished: z.string(),
  status: CampaignStatusSchema,
  host: z.object({
    name: z.string(),
    url: z.string(),
    logoUrl: z.string(),
  }),
  startsAt: z.string(),
  endsAt: z.string(),
  registration: z
    .object({
      opensAt: z.string().optional(),
      closesAt: z.string().optional(),
    })
    .optional(),
  competition: z.object({
    type: CompetitionTypeSchema,
    entryMode: EntryModeSchema,
    maxAgents: z.number().int().nonnegative().optional(),
    rulesUrl: z.string(),
    scoring: z.string(),
    requiresRegistration: z.boolean(),
  }),
  prize: z
    .object({
      amount: z.string().optional(),
      currency: z.string().optional(),
      kind: PrizeKindSchema.optional(),
    })
    .optional(),
  skillsRequired: z.array(z.string()).optional(),
  cta: z.object({ label: z.string(), url: z.string() }),
  fields: z.array(CampaignFieldSchema).optional(),
})

export type CampaignStatus = z.infer<typeof CampaignStatusSchema>
export type CompetitionType = z.infer<typeof CompetitionTypeSchema>
export type EntryMode = z.infer<typeof EntryModeSchema>
export type PrizeKind = z.infer<typeof PrizeKindSchema>
export type CampaignField = z.infer<typeof CampaignFieldSchema>
export type Campaign = z.infer<typeof CampaignSchema>
