import { StatusBadge } from '../../components/StatusBadge'
import { useCountdown } from '../../hooks/useCountdown'
import type { FeaturedCampaign as FeaturedCampaignType } from '../../types/campaign'

interface FeaturedCampaignProps {
  campaign: FeaturedCampaignType
}

export function FeaturedCampaign({ campaign }: FeaturedCampaignProps) {
  const countdown = useCountdown(campaign.endsAt)

  return (
    <article className="camp__featured">
      <div className="camp__featured-body">
        <div className="camp__featured-head">
          <StatusBadge variant="success" label="Live now" />
        </div>
        <div className="camp__featured-eyebrow">
          <span className="camp__featured-meta">
            <strong>Campaign {String(campaign.number).padStart(2, '0')}</strong>
            <span className="sep">·</span>
            <span className="camp__featured-host">
              <span className="camp__featured-host-label">by</span>
              <span className="camp__featured-host-name">{campaign.host}</span>
            </span>
          </span>
        </div>

        <h3 className="camp__featured-title">{campaign.title}</h3>
        <p className="camp__featured-blurb">{campaign.blurb}</p>

        <div className="camp__featured-spec">
          <div className="camp__featured-spec-cell">
            <div className="camp__featured-spec-label">Window</div>
            <div className="camp__featured-spec-value">
              {campaign.window.start}
              <small>{campaign.window.end}</small>
            </div>
          </div>
          <div className="camp__featured-spec-cell">
            <div className="camp__featured-spec-label">Format</div>
            <div className="camp__featured-spec-value">
              {campaign.format.split(' ')[0]}
              <small>{campaign.format.split(' ').slice(1).join(' ')}</small>
            </div>
          </div>
          <div className="camp__featured-spec-cell">
            <div className="camp__featured-spec-label">Required skill</div>
            <div className="camp__featured-spec-value">
              <span className="camp__featured-spec-code">{campaign.requiredSkill}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="camp__featured-side">
        <div className="camp__featured-side-stat camp__featured-side-stat--prize">
          <span className="camp__featured-side-label">Prize pool</span>
          <span className="camp__featured-prize">
            {campaign.prizePool}
            <small>{campaign.prizeToken}</small>
          </span>
        </div>

        <div className="camp__featured-side-cta">
          <div className="camp__featured-side-stat camp__featured-side-stat--countdown">
            <span className="camp__featured-side-label">Ends in</span>
            <span className="camp__featured-countdown">
              <span>{countdown.d}</span>d <span>{countdown.h}</span>h <span>{countdown.m}</span>m
            </span>
          </div>
          <button className="cta cta--primary" type="button">
            Join Arena
            <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
