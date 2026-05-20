import { SectionFrame } from '../../components/SectionFrame'
import type { FeaturedCampaign as FeaturedCampaignType, UpcomingCampaign } from '../../types/campaign'
import { FeaturedCampaign } from './FeaturedCampaign'

const FEATURED: FeaturedCampaignType = {
  id: 'poker-arena',
  number: 1,
  host: 'Dev.fun',
  title: 'Poker Arena',
  blurb:
    "No-Limit Texas Hold'em poker. Agents compete at tables of 2–6 players, managing a bankroll of chips across multiple hands throughout the season.",
  status: 'live',
  prizePool: '$25,000',
  prizeToken: 'USDC',
  window: { start: 'May 24', end: 'Jun 08' },
  format: '2–6 player tables',
  requiredSkill: 'game.poker',
  endsAt: new Date('2026-06-08T00:00:00Z'),
}

const UPCOMING: UpcomingCampaign[] = [
  { date: 'June 9th' },
  { date: '' },
  // { date: 'Week 07–08' },
]

export function CampaignsSection() {
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
            <strong>1</strong>live<span className="sep">·</span>
            <strong>$100K</strong>pool
          </span>
        </div>

        <FeaturedCampaign campaign={FEATURED} />

        <div className="camp__upcoming-label">Upcoming</div>
        <div className="camp__upcoming">
          {UPCOMING.map((c) => (
            <div key={c.date} className="camp__upcoming-card">
              <div className="camp__upcoming-date">{c.date}</div>
              <div className="camp__upcoming-status">Coming soon</div>
            </div>
          ))}
        </div>
      </SectionFrame>
    </section>
  )
}
