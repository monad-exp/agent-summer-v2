import { SignInButton } from '../components/SignInButton'
import { ToastStack } from '../components/Toast'
import { AnnouncementsSection } from '../features/announcements/AnnouncementsSection'
import { ApiHubSection } from '../features/api-hub/ApiHubSection'
import { CampaignsSection } from '../features/campaigns/CampaignsSection'
import { DiscoverySection } from '../features/discovery/DiscoverySection'
import { HeroSection } from '../features/hero/HeroSection'

export default function Page() {
  return (
    <>
      <div className="nav-placeholder" style={{ position: 'relative' }}>
        MonApp nav, inherited chrome
        <div
          style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <SignInButton />
        </div>
      </div>
      <HeroSection />
      <CampaignsSection />
      <AnnouncementsSection />
      <DiscoverySection />
      <ApiHubSection />
      <div className="foot-placeholder">MonApp footer, inherited chrome</div>
      <ToastStack />
    </>
  )
}
