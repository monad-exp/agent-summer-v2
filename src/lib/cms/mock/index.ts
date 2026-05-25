import 'server-only'

import type { Announcement } from '../../../types/announcement'
import type { Campaign } from '../../../types/campaign'
import type { DiscoveryApp } from '../../../types/discovery'
import {
  pickPublishedSkillMarkdown,
  transformAnnouncements,
  transformCampaigns,
  transformDiscoveryApps,
} from '../core'
import type { CmsSkillMarkdownItem } from '../types'
import {
  MOCK_ANNOUNCEMENTS,
  MOCK_CAMPAIGNS,
  MOCK_DISCOVERY_APPS,
  MOCK_SKILL_MARKDOWN,
} from './data'

export function getMockCampaigns(): Campaign[] {
  return transformCampaigns(MOCK_CAMPAIGNS)
}

export function getMockAnnouncements(): Announcement[] {
  return transformAnnouncements(MOCK_ANNOUNCEMENTS)
}

export function getMockDiscoveryApps(): DiscoveryApp[] {
  return transformDiscoveryApps(MOCK_DISCOVERY_APPS)
}

export function getMockSkillMarkdown(): CmsSkillMarkdownItem | null {
  return pickPublishedSkillMarkdown(MOCK_SKILL_MARKDOWN)
}
