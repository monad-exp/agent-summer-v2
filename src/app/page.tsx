import { AnnouncementsSection } from '../features/announcements/AnnouncementsSection'
import { ApiHubSection } from '../features/api-hub/ApiHubSection'
import { CampaignsSection } from '../features/campaigns/CampaignsSection'
import { DiscoverySection } from '../features/discovery/DiscoverySection'
import { HeroSection } from '../features/hero/HeroSection'

export default function Page() {
  return (
    <>
      <div className="nav-placeholder">MonApp nav, inherited chrome</div>
      <HeroSection />
      <CampaignsSection />
      <AnnouncementsSection />
      <DiscoverySection />
      <ApiHubSection />
      <div className="foot-placeholder">MonApp footer, inherited chrome</div>
    </>
  )
}
