import { getAnnouncements } from '../../../../lib/cms/server'
import { buildAnnouncementFeed, jsonFeedResponse } from '../../../../lib/cms/feed'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const announcements = await getAnnouncements()
  return jsonFeedResponse(buildAnnouncementFeed(announcements), req)
}
