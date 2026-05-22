import { getCampaigns } from '../../../../lib/cms/server'
import { buildCampaignFeed, jsonFeedResponse } from '../../../../lib/cms/feed'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const campaigns = await getCampaigns()
  return jsonFeedResponse(buildCampaignFeed(campaigns), req)
}
