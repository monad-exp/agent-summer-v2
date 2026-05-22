import { SectionFrame } from '../../components/SectionFrame'
import { getCampaigns } from '../../lib/cms/server'
import { FeaturedCampaign } from './FeaturedCampaign'

function formatPrizePool(amount?: string): string {
  if (!amount) return ''
  const num = Number(amount)
  if (!Number.isFinite(num)) return amount
  if (num >= 1000) return `$${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K`
  return `$${num.toLocaleString('en-US')}`
}

export async function CampaignsSection() {
  const campaigns = await getCampaigns()

  const active = campaigns.filter((c) => c.status === 'active')
  const upcoming = campaigns.filter((c) => c.status === 'upcoming')
  const featured = active[0] ?? upcoming[0] ?? null

  const totalPoolNum = campaigns.reduce((sum, c) => {
    const n = Number(c.prize?.amount)
    return sum + (Number.isFinite(n) ? n : 0)
  }, 0)
  const totalPool = formatPrizePool(String(totalPoolNum))

  return (
    <section className="camp" data-screen-label="02 Campaigns">
      <SectionFrame>
        <div className="sec-head">
          <div className="sec-head__left">
            <div className="sec-head__eyebrow">Campaigns</div>
            <h2 className="sec-head__title">Campaigns, currently live.</h2>
            <p className="sec-head__desc">
              Hosted by ecosystem teams. Prize pools, schedules, and entry points: all routed to
              the host.
            </p>
          </div>
          <span className="sec-head__meta">
            <strong>{active.length}</strong>live<span className="sep">·</span>
            <strong>{totalPool || '$0'}</strong>pool
          </span>
        </div>

        {featured && <FeaturedCampaign campaign={featured} number={1} />}

        <div className="camp__upcoming-label">Upcoming</div>
        <div className="camp__upcoming">
          {(upcoming.length > 0 ? upcoming : [null, null]).map((c, i) => (
            <div key={c?.id ?? `placeholder-${i}`} className="camp__upcoming-card">
              <div className="camp__upcoming-date">
                {c
                  ? new Date(c.startsAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </div>
              <div className="camp__upcoming-status">{c ? c.title : 'Coming soon'}</div>
            </div>
          ))}
        </div>
      </SectionFrame>
    </section>
  )
}
