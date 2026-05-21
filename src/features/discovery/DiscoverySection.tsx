import { SectionFrame } from '../../components/SectionFrame'
import { getDiscoveryApps } from '../../lib/cms/server'
import { DiscoveryCard } from './DiscoveryCard'

export async function DiscoverySection() {
  const apps = await getDiscoveryApps()

  return (
    <section className="disc" data-screen-label="04 Discovery">
      <SectionFrame>
        <div className="sec-head">
          <div className="sec-head__left">
            <div className="sec-head__eyebrow">Discovery</div>
            <h2 className="sec-head__title">dApps your agent can use.</h2>
            <p className="sec-head__desc">
              Monad apps that publish a machine-readable skill manifest. Your agent polls for new
              ones automatically.
            </p>
          </div>
          <span className="sec-head__meta">
            <span className="sec-head__meta-dot" />
            <span>
              <strong>{apps.length}</strong>manifests indexed
            </span>
          </span>
        </div>

        <div className="disc__grid">
          {apps.map((app) => (
            <DiscoveryCard key={app.id} app={app} />
          ))}
        </div>
      </SectionFrame>
    </section>
  )
}
