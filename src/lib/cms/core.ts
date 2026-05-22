import type { Announcement, AnnouncementCategory } from '../../types/announcement'
import type {
  Campaign,
  CampaignField,
  CampaignStatus,
  CompetitionType,
  EntryMode,
  PrizeKind,
} from '../../types/campaign'
import type { DiscoveryApp } from '../../types/discovery'
import type {
  CmsAnnouncementItem,
  CmsAnnouncementsData,
  CmsCampaignItem,
  CmsCampaignsData,
  CmsDiscoveryAppItem,
  CmsDiscoveryAppsData,
  CmsSkillMarkdownData,
  CmsSkillMarkdownItem,
} from './types'

export interface ContentfulEnv {
  spaceId: string
  accessToken: string
  environment: string
}

export async function fetchContentfulGraphQL<T>(
  query: string,
  env: ContentfulEnv,
  init?: { revalidate?: number | false; tags?: string[]; cache?: RequestCache },
): Promise<T> {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${env.spaceId}/environments/${env.environment}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.accessToken}`,
      },
      body: JSON.stringify({ query }),
      next:
        init?.revalidate !== undefined || init?.tags
          ? { revalidate: init.revalidate, tags: init.tags }
          : undefined,
      cache: init?.cache,
    },
  )
  if (!response.ok) {
    throw new Error(
      `Contentful API error: ${response.status} ${response.statusText}`,
    )
  }
  const data = await response.json()
  if (data.errors) {
    throw new Error(`Contentful GraphQL errors: ${JSON.stringify(data.errors)}`)
  }
  return data.data as T
}

// --- Queries ---------------------------------------------------------------

export const CAMPAIGNS_QUERY = (preview: boolean) => `{
  agentCampaignCollection(preview: ${preview}, limit: 100, order: [startsAt_ASC]) {
    items {
      sys { id firstPublishedAt }
      slug
      title
      summary
      url
      datePublished
      hostName
      hostUrl
      hostLogo { url }
      startsAt
      endsAt
      registrationOpensAt
      registrationClosesAt
      competitionType
      entryMode
      maxAgents
      rulesUrl
      scoring
      requiresRegistration
      prizeAmount
      prizeCurrency
      prizeKind
      skillsRequired
      ctaLabel
      ctaUrl
      fields
    }
  }
}`

export const ANNOUNCEMENTS_QUERY = (preview: boolean) => `{
  agentAnnouncementCollection(preview: ${preview}, limit: 100, order: [datePublished_DESC]) {
    items {
      sys { id }
      slug
      title
      summary
      url
      datePublished
      tags
      category
    }
  }
}`

export const DISCOVERY_APPS_QUERY = (preview: boolean) => `{
  agentDiscoveryAppCollection(preview: ${preview}, limit: 200, order: [slug_ASC]) {
    items {
      sys { id }
      slug
      description
      categories
      skillMdUrl
      skillsCount
      verifiedAt
      app {
        name
        appLink
        logo { url }
      }
    }
  }
}`

export const SKILL_MARKDOWN_QUERY = (preview: boolean) => `{
  agentSkillMarkdownCollection(
    preview: ${preview}
    limit: 1
    where: { status: "published" }
    order: [publishedAt_DESC]
  ) {
    items {
      version
      title
      body
      status
      publishedAt
    }
  }
}`

// --- Transformers ----------------------------------------------------------

export function deriveCampaignStatus(
  startsAt: string,
  endsAt: string,
  now: Date = new Date(),
): CampaignStatus {
  const start = new Date(startsAt).getTime()
  const end = new Date(endsAt).getTime()
  const t = now.getTime()
  if (t < start) return 'upcoming'
  if (t > end) return 'ended'
  return 'active'
}

function parseCampaignFields(value: unknown): CampaignField[] | undefined {
  if (!Array.isArray(value)) return undefined
  const out: CampaignField[] = []
  for (const entry of value) {
    if (!entry || typeof entry !== 'object') continue
    const e = entry as { label?: unknown; value?: unknown; kind?: unknown }
    if (typeof e.label !== 'string' || typeof e.value !== 'string') continue
    out.push({
      label: e.label,
      value: e.value,
      kind: typeof e.kind === 'string' ? e.kind : undefined,
    })
  }
  return out.length > 0 ? out : undefined
}

export function transformCampaign(item: CmsCampaignItem, now?: Date): Campaign {
  return {
    id: `campaign:${item.slug}`,
    slug: item.slug,
    url: item.url,
    title: item.title,
    summary: item.summary,
    datePublished: item.datePublished,
    status: deriveCampaignStatus(item.startsAt, item.endsAt, now),
    host: {
      name: item.hostName,
      url: item.hostUrl,
      logoUrl: item.hostLogo?.url ?? '',
    },
    startsAt: item.startsAt,
    endsAt: item.endsAt,
    registration:
      item.registrationOpensAt || item.registrationClosesAt
        ? {
            opensAt: item.registrationOpensAt ?? undefined,
            closesAt: item.registrationClosesAt ?? undefined,
          }
        : undefined,
    competition: {
      type: item.competitionType as CompetitionType,
      entryMode: item.entryMode as EntryMode,
      maxAgents: item.maxAgents ?? undefined,
      rulesUrl: item.rulesUrl,
      scoring: item.scoring,
      requiresRegistration: item.requiresRegistration,
    },
    prize:
      item.prizeAmount || item.prizeCurrency || item.prizeKind
        ? {
            amount: item.prizeAmount ?? undefined,
            currency: item.prizeCurrency ?? undefined,
            kind: (item.prizeKind ?? undefined) as PrizeKind | undefined,
          }
        : undefined,
    skillsRequired: item.skillsRequired ?? undefined,
    cta: { label: item.ctaLabel, url: item.ctaUrl },
    fields: parseCampaignFields(item.fields),
  }
}

export function transformCampaigns(
  data: CmsCampaignsData,
  now: Date = new Date(),
): Campaign[] {
  return data.agentCampaignCollection.items
    .filter((item) => new Date(item.datePublished).getTime() <= now.getTime())
    .map((item) => transformCampaign(item, now))
}

export function transformAnnouncement(item: CmsAnnouncementItem): Announcement {
  return {
    id: `ann:${item.slug}`,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    url: item.url,
    datePublished: item.datePublished,
    tags: item.tags ?? undefined,
    category: item.category as AnnouncementCategory,
  }
}

export function transformAnnouncements(
  data: CmsAnnouncementsData,
  now: Date = new Date(),
): Announcement[] {
  return data.agentAnnouncementCollection.items
    .filter((item) => new Date(item.datePublished).getTime() <= now.getTime())
    .map(transformAnnouncement)
}

export function transformDiscoveryApp(
  item: CmsDiscoveryAppItem,
): DiscoveryApp | null {
  if (!item.app) return null
  return {
    id: `discover:${item.slug}`,
    slug: item.slug,
    name: item.app.name,
    description: item.description,
    websiteUrl: item.app.appLink,
    logoUrl: item.app.logo?.url ?? '',
    categories: item.categories ?? [],
    skillMdUrl: item.skillMdUrl,
    skillsCount: item.skillsCount,
    verifiedAt: item.verifiedAt ?? undefined,
  }
}

export function transformDiscoveryApps(
  data: CmsDiscoveryAppsData,
): DiscoveryApp[] {
  return data.agentDiscoveryAppCollection.items
    .map(transformDiscoveryApp)
    .filter((app): app is DiscoveryApp => app !== null)
}

export function pickPublishedSkillMarkdown(
  data: CmsSkillMarkdownData,
): CmsSkillMarkdownItem | null {
  return data.agentSkillMarkdownCollection.items[0] ?? null
}
