import 'server-only'

import type { Announcement } from '../../types/announcement'
import type { Campaign } from '../../types/campaign'
import type { DiscoveryApp } from '../../types/discovery'
import {
  ANNOUNCEMENTS_QUERY,
  CAMPAIGNS_QUERY,
  DISCOVERY_APPS_QUERY,
  SKILL_MARKDOWN_QUERY,
  pickPublishedSkillMarkdown,
  transformAnnouncements,
  transformCampaigns,
  transformDiscoveryApps,
} from './core'
import type {
  CmsAnnouncementsData,
  CmsCampaignsData,
  CmsDiscoveryAppsData,
  CmsSkillMarkdownData,
  CmsSkillMarkdownItem,
} from './types'

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT ?? 'master'
const PREVIEW_MODE = process.env.IS_PREVIEW_MODE_ENABLED === 'true'

if (!SPACE_ID || !ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN must be set')
}

async function fetchGraphQL<T>(query: string): Promise<T> {
  const usePreview = PREVIEW_MODE && Boolean(PREVIEW_TOKEN)
  const token = usePreview ? PREVIEW_TOKEN! : ACCESS_TOKEN!

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
      next: usePreview ? { revalidate: 0 } : { revalidate: 3600, tags: ['cms'] },
      cache: usePreview ? 'no-store' : undefined,
    },
  )
  if (!response.ok) {
    throw new Error(`Contentful API error: ${response.status} ${response.statusText}`)
  }
  const data = await response.json()
  if (data.errors) {
    throw new Error(`Contentful GraphQL errors: ${JSON.stringify(data.errors)}`)
  }
  return data.data as T
}

export async function getCampaigns(): Promise<Campaign[]> {
  try {
    const data = await fetchGraphQL<CmsCampaignsData>(CAMPAIGNS_QUERY(PREVIEW_MODE))
    return transformCampaigns(data)
  } catch (error) {
    console.error('[cms] getCampaigns failed:', error)
    return []
  }
}

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const data = await fetchGraphQL<CmsAnnouncementsData>(
      ANNOUNCEMENTS_QUERY(PREVIEW_MODE),
    )
    return transformAnnouncements(data)
  } catch (error) {
    console.error('[cms] getAnnouncements failed:', error)
    return []
  }
}

export async function getDiscoveryApps(): Promise<DiscoveryApp[]> {
  try {
    const data = await fetchGraphQL<CmsDiscoveryAppsData>(
      DISCOVERY_APPS_QUERY(PREVIEW_MODE),
    )
    return transformDiscoveryApps(data)
  } catch (error) {
    console.error('[cms] getDiscoveryApps failed:', error)
    return []
  }
}

export async function getSkillMarkdown(): Promise<CmsSkillMarkdownItem | null> {
  try {
    const data = await fetchGraphQL<CmsSkillMarkdownData>(
      SKILL_MARKDOWN_QUERY(PREVIEW_MODE),
    )
    return pickPublishedSkillMarkdown(data)
  } catch (error) {
    console.error('[cms] getSkillMarkdown failed:', error)
    return null
  }
}
