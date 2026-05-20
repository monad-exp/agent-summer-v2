import type { DiscoveryCard as DiscoveryCardType } from '../../types/discovery'

interface DiscoveryCardProps {
  card: DiscoveryCardType
}

export function DiscoveryCard({ card }: DiscoveryCardProps) {
  return (
    <article className="disc__card">
      <div className="disc__card-header">
        <div className="disc__card-avatar" data-thumb={card.thumbKey}>
          {card.name[0]}
        </div>
        <div className="disc__card-id">
          <h3 className="disc__card-name">{card.name}</h3>
          <div className="disc__card-handle">{card.handle}</div>
        </div>
      </div>
      <p className="disc__card-desc">{card.description}</p>
      <div className="disc__card-tags">
        {card.tags.map((tag) => (
          <span key={tag} className="disc__card-tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="disc__card-foot">
        <span className="disc__card-link">
          View skills <i className="ph ph-arrow-up-right" aria-hidden="true" />
        </span>
        <span className="disc__card-version">{card.version}</span>
      </div>
    </article>
  )
}
