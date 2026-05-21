// Raw GraphQL response shapes from the Contentful Delivery API.
// Mirrors the field IDs declared in cms-scripts/create-content-types.cjs.

export interface CmsAssetRef {
  url: string
}

export interface CmsCampaignItem {
  sys?: { id: string; firstPublishedAt?: string }
  slug: string
  title: string
  summary: string
  url: string
  datePublished: string
  hostName: string
  hostUrl: string
  hostLogo: CmsAssetRef | null
  startsAt: string
  endsAt: string
  registrationOpensAt: string | null
  registrationClosesAt: string | null
  competitionType: string
  entryMode: string
  maxAgents: number | null
  rulesUrl: string
  scoring: string
  requiresRegistration: boolean
  prizeAmount: string | null
  prizeCurrency: string | null
  prizeKind: string | null
  skillsRequired: string[] | null
  ctaLabel: string
  ctaUrl: string
  fields: unknown
}

export interface CmsCampaignsData {
  agentCampaignCollection: { items: CmsCampaignItem[] }
}

export interface CmsAnnouncementItem {
  sys?: { id: string }
  slug: string
  title: string
  summary: string
  url: string
  datePublished: string
  tags: string[] | null
  category: string
}

export interface CmsAnnouncementsData {
  agentAnnouncementCollection: { items: CmsAnnouncementItem[] }
}

export interface CmsLinkedApp {
  name: string
  appLink: string
  logo: CmsAssetRef | null
}

export interface CmsDiscoveryAppItem {
  sys?: { id: string }
  slug: string
  description: string
  categories: string[] | null
  skillMdUrl: string
  skillsCount: number
  verifiedAt: string | null
  app: CmsLinkedApp | null
}

export interface CmsDiscoveryAppsData {
  agentDiscoveryAppCollection: { items: CmsDiscoveryAppItem[] }
}

export interface CmsSkillMarkdownItem {
  version: string
  title: string
  body: string
  status: string
  publishedAt: string
}

export interface CmsSkillMarkdownData {
  agentSkillMarkdownCollection: { items: CmsSkillMarkdownItem[] }
}
