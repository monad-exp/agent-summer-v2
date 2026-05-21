import Image from 'next/image'
import type { DiscoveryApp } from '../../types/discovery'

interface DiscoveryCardProps {
  app: DiscoveryApp
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function DiscoveryCard({ app }: DiscoveryCardProps) {
  const handle = hostname(app.websiteUrl)
  return (
    <article className="disc__card">
      <div className="disc__card-header">
        <div className="disc__card-avatar" data-thumb={app.slug}>
          {app.logoUrl ? (
            <Image
              src={app.logoUrl}
              alt={`${app.name} logo`}
              width={56}
              height={56}
              className="disc__card-avatar-img"
            />
          ) : (
            app.name[0]
          )}
        </div>
        <div className="disc__card-id">
          <h3 className="disc__card-name">{app.name}</h3>
          <div className="disc__card-handle">{handle}</div>
        </div>
      </div>
      <p className="disc__card-desc">{app.description}</p>
      <div className="disc__card-tags">
        {app.categories.map((tag) => (
          <span key={tag} className="disc__card-tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="disc__card-foot">
        <a className="disc__card-link" href={app.skillMdUrl} target="_blank" rel="noreferrer">
          View skills <i className="ph ph-arrow-up-right" aria-hidden="true" />
        </a>
        <span className="disc__card-version">{app.skillsCount} skills</span>
      </div>
    </article>
  )
}
