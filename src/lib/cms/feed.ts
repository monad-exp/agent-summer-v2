import 'server-only'

import { createHash } from 'node:crypto'
import type { Announcement } from '../../types/announcement'
import type { Campaign } from '../../types/campaign'
import type { DiscoveryApp } from '../../types/discovery'

const FEED_VERSION = 'https://jsonfeed.org/version/1.1'
const FEED_SCHEMA = 'monad-agent-feed-v1'

function getBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

interface FeedShell<T> {
  version: string
  title: string
  home_page_url: string
  feed_url: string
  description: string
  language: 'en'
  _schema: string
  items: T[]
}

export interface CampaignFeedItem {
  id: string
  url: string
  title: string
  summary: string
  date_published: string
  _monad_agent: {
    host: { name: string; url: string; logo_url: string }
    status: Campaign['status']
    starts_at: string
    ends_at: string
    registration?: { opens_at?: string; closes_at?: string }
    competition: {
      type: Campaign['competition']['type']
      entry_mode: Campaign['competition']['entryMode']
      max_agents?: number
      rules_url: string
      scoring: string
      requires_registration: boolean
    }
    prize?: { amount?: string; currency?: string; kind?: Campaign['prize'] extends infer P ? P extends { kind?: infer K } ? K : never : never }
    skill_required?: string[]
    cta: { label: string; url: string }
    fields?: Campaign['fields']
  }
}

export interface AnnouncementFeedItem {
  id: string
  url: string
  title: string
  summary: string
  date_published: string
  tags?: string[]
  _monad_agent: { category: Announcement['category'] }
}

export interface DiscoveryFeedItem {
  id: string
  url: string
  title: string
  summary: string
  _monad_agent: {
    logo_url: string
    categories: string[]
    website_url: string
    skill_md_url: string
    skills_count: number
    verified_at?: string
  }
}

export function buildCampaignFeed(campaigns: Campaign[]): FeedShell<CampaignFeedItem> {
  const base = getBaseUrl()
  return {
    version: FEED_VERSION,
    title: 'Monad Agent Campaigns',
    home_page_url: `${base}/agent`,
    feed_url: `${base}/agent/campaigns/feed.json`,
    description: 'Active and upcoming competitions for AI agents on Monad.',
    language: 'en',
    _schema: FEED_SCHEMA,
    items: campaigns.map(toCampaignFeedItem),
  }
}

export function buildAnnouncementFeed(
  announcements: Announcement[],
): FeedShell<AnnouncementFeedItem> {
  const base = getBaseUrl()
  return {
    version: FEED_VERSION,
    title: 'Monad Agent Announcements',
    home_page_url: `${base}/agent`,
    feed_url: `${base}/agent/announcements/feed.json`,
    description: 'Release notes, partner updates, campaign launches, and protocol updates.',
    language: 'en',
    _schema: FEED_SCHEMA,
    items: announcements.map(toAnnouncementFeedItem),
  }
}

export function buildDiscoveryFeed(apps: DiscoveryApp[]): FeedShell<DiscoveryFeedItem> {
  const base = getBaseUrl()
  return {
    version: FEED_VERSION,
    title: 'Monad Agent Discovery',
    home_page_url: `${base}/agent`,
    feed_url: `${base}/agent/discover/feed.json`,
    description: 'Apps and protocols agents can use on Monad.',
    language: 'en',
    _schema: FEED_SCHEMA,
    items: apps.map(toDiscoveryFeedItem),
  }
}

function toCampaignFeedItem(c: Campaign): CampaignFeedItem {
  return {
    id: c.id,
    url: c.url,
    title: c.title,
    summary: c.summary,
    date_published: c.datePublished,
    _monad_agent: {
      host: { name: c.host.name, url: c.host.url, logo_url: c.host.logoUrl },
      status: c.status,
      starts_at: c.startsAt,
      ends_at: c.endsAt,
      ...(c.registration && {
        registration: {
          ...(c.registration.opensAt && { opens_at: c.registration.opensAt }),
          ...(c.registration.closesAt && { closes_at: c.registration.closesAt }),
        },
      }),
      competition: {
        type: c.competition.type,
        entry_mode: c.competition.entryMode,
        ...(c.competition.maxAgents !== undefined && { max_agents: c.competition.maxAgents }),
        rules_url: c.competition.rulesUrl,
        scoring: c.competition.scoring,
        requires_registration: c.competition.requiresRegistration,
      },
      ...(c.prize && { prize: c.prize as CampaignFeedItem['_monad_agent']['prize'] }),
      ...(c.skillsRequired && { skill_required: c.skillsRequired }),
      cta: c.cta,
      ...(c.fields && { fields: c.fields }),
    },
  }
}

function toAnnouncementFeedItem(a: Announcement): AnnouncementFeedItem {
  return {
    id: a.id,
    url: a.url,
    title: a.title,
    summary: a.summary,
    date_published: a.datePublished,
    ...(a.tags && { tags: a.tags }),
    _monad_agent: { category: a.category },
  }
}

function toDiscoveryFeedItem(d: DiscoveryApp): DiscoveryFeedItem {
  return {
    id: d.id,
    url: d.websiteUrl,
    title: d.name,
    summary: d.description,
    _monad_agent: {
      logo_url: d.logoUrl,
      categories: d.categories,
      website_url: d.websiteUrl,
      skill_md_url: d.skillMdUrl,
      skills_count: d.skillsCount,
      ...(d.verifiedAt && { verified_at: d.verifiedAt }),
    },
  }
}

export function jsonFeedResponse(body: unknown, req: Request): Response {
  const serialized = JSON.stringify(body, null, 2)
  const etag = `"${createHash('sha256').update(serialized).digest('hex')}"`
  const ifNoneMatch = req.headers.get('if-none-match')
  if (ifNoneMatch && ifNoneMatch === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } })
  }
  return new Response(serialized, {
    status: 200,
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
      ETag: etag,
    },
  })
}

export function markdownResponse(body: string, req: Request): Response {
  const etag = `"${createHash('sha256').update(body).digest('hex')}"`
  const ifNoneMatch = req.headers.get('if-none-match')
  if (ifNoneMatch && ifNoneMatch === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } })
  }
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
      ETag: etag,
    },
  })
}
