import { SectionFrame } from '../../components/SectionFrame'
import { getAnnouncements } from '../../lib/cms/server'
import type { AnnouncementCategory } from '../../types/announcement'

const TAG_LABEL: Record<AnnouncementCategory, string> = {
  release: 'Release',
  partner: 'Partner',
  launch: 'Launch',
  campaign: 'Campaign',
  protocol: 'Protocol',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export async function AnnouncementsSection() {
  const announcements = await getAnnouncements()

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
            {announcements.map((a) => (
              <a key={a.id} className="anno__row" href={a.url} target="_blank" rel="noreferrer">
                <div className="anno__date">{formatDate(a.datePublished)}</div>
                <div>
                  <span className="anno__tag">{TAG_LABEL[a.category]}</span>
                </div>
                <div>
                  <h3 className="anno__title">{a.title}</h3>
                  <p className="anno__body">{a.summary}</p>
                </div>
                <div className="anno__more">
                  Read <i className="ph ph-arrow-up-right" aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </SectionFrame>
    </section>
  )
}
