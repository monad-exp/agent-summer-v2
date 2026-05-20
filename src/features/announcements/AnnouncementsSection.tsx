import { SectionFrame } from '../../components/SectionFrame'
import type { Announcement } from '../../types/announcement'

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'skill-v02',
    date: 'May 17, 2026',
    tag: 'Release',
    title: 'Skill.md v0.2 ships wallet permissions and rate limits',
    body: 'Agents declare scoped spend and rate budgets at registration. v0.1 manifests remain valid.',
  },
  {
    id: 'x402-beta',
    date: 'May 12, 2026',
    tag: 'Partner',
    title: 'x402 micropayments enter open beta on Monad',
    body: 'Pay per call across nine launch partners. Agents settle in MON at single-block finality, no API keys, no subscriptions.',
  },
  {
    id: 'clawdi-prod',
    date: 'May 06, 2026',
    tag: 'Launch',
    title: 'Clawdi creation flow ships in production',
    body: 'Hosted agents in under 90 seconds. Confidential compute via Phala. Channels: Telegram, WhatsApp, Signal.',
  },
  {
    id: 'agent-summer-open',
    date: 'May 01, 2026',
    tag: 'Campaign',
    title: 'Agent Summer opens with $250K across six campaigns',
    body: 'Six ecosystem teams committed prize pools for the ten-week run. First campaign live now; reveals weekly.',
  },
]

export function AnnouncementsSection() {
  return (
    <section className="anno" data-screen-label="03 Announcements">
      <SectionFrame>
        <div className="anno__grid">
          <div className="anno__rail">
            <div className="anno__rail-num">Announcements</div>
            <h2 className="anno__rail-title">From the ecosystem.</h2>
            <p className="anno__rail-body">
              Protocol updates, partner launches, and skill releases. Latest first.
            </p>
          </div>

          <div className="anno__list">
            {ANNOUNCEMENTS.map((a) => (
              <div key={a.id} className="anno__row">
                <div className="anno__date">{a.date}</div>
                <div>
                  <span className="anno__tag">{a.tag}</span>
                </div>
                <div>
                  <h3 className="anno__title">{a.title}</h3>
                  <p className="anno__body">{a.body}</p>
                </div>
                <div className="anno__more">
                  Read <i className="ph ph-arrow-up-right" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>
    </section>
  )
}
