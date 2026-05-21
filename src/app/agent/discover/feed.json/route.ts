import { getDiscoveryApps } from '../../../../lib/cms/server'
import { buildDiscoveryFeed, jsonFeedResponse } from '../../../../lib/cms/feed'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const apps = await getDiscoveryApps()
  return jsonFeedResponse(buildDiscoveryFeed(apps), req)
}
