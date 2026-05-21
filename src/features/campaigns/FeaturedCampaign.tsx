'use client'

import { StatusBadge } from '../../components/StatusBadge'
import { useCountdown } from '../../hooks/useCountdown'
import type { Campaign } from '../../types/campaign'

interface FeaturedCampaignProps {
  campaign: Campaign
  number: number
}

function formatWindowLabel(iso: string): { primary: string; secondary: string } {
  const d = new Date(iso)
  const month = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
  const day = String(d.getUTCDate()).padStart(2, '0')
  return { primary: month, secondary: day }
}

function formatPrize(amount?: string): string {
  if (!amount) return ''
  const num = Number(amount)
  if (!Number.isFinite(num)) return amount
  if (num >= 1000) return `$${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K`
  return `$${num.toLocaleString('en-US')}`
}

export function FeaturedCampaign({ campaign, number }: FeaturedCampaignProps) {
  const endsAtDate = new Date(campaign.endsAt)
  const countdown = useCountdown(endsAtDate)

  const start = formatWindowLabel(campaign.startsAt)
  const end = formatWindowLabel(campaign.endsAt)

  const formatField = campaign.fields?.find((f) => f.label.toLowerCase() === 'format')
  const format = formatField?.value ?? campaign.competition.scoring

  const [formatPrimary, ...formatRest] = format.split(' ')
  const formatSecondary = formatRest.join(' ')

  const requiredSkill = campaign.skillsRequired?.[0] ?? campaign.competition.type
  const prizeAmount = formatPrize(campaign.prize?.amount)
  const statusLabel =
    campaign.status === 'active'
      ? 'Live now'
      : campaign.status === 'upcoming'
      ? 'Upcoming'
      : 'Ended'

  return (
    <article className="camp__featured">
      <div className="camp__featured-body">
        <div className="camp__featured-head">
          <StatusBadge
            variant={campaign.status === 'active' ? 'success' : 'pending'}
            label={statusLabel}
          />
        </div>
        <div className="camp__featured-eyebrow">
          <span className="camp__featured-meta">
            <strong>Campaign {String(number).padStart(2, '0')}</strong>
            <span className="sep">·</span>
            <span className="camp__featured-host">
              <span className="camp__featured-host-label">by</span>
              <span className="camp__featured-host-name">{campaign.host.name}</span>
            </span>
          </span>
        </div>

        <h3 className="camp__featured-title">{campaign.title}</h3>
        <p className="camp__featured-blurb">{campaign.summary}</p>

        <div className="camp__featured-spec">
          <div className="camp__featured-spec-cell">
            <div className="camp__featured-spec-label">Window</div>
            <div className="camp__featured-spec-value">
              {start.primary} {start.secondary}
              <small>
                {end.primary} {end.secondary}
              </small>
            </div>
          </div>
          <div className="camp__featured-spec-cell">
            <div className="camp__featured-spec-label">Format</div>
            <div className="camp__featured-spec-value">
              {formatPrimary}
              <small>{formatSecondary}</small>
            </div>
          </div>
          <div className="camp__featured-spec-cell">
            <div className="camp__featured-spec-label">Required skill</div>
            <div className="camp__featured-spec-value">
              <span className="camp__featured-spec-code">{requiredSkill}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="camp__featured-side">
        <div className="camp__featured-side-stat camp__featured-side-stat--prize">
          <span className="camp__featured-side-label">Prize pool</span>
          <span className="camp__featured-prize">
            {prizeAmount}
            <small>{campaign.prize?.currency ?? ''}</small>
          </span>
        </div>

        <div className="camp__featured-side-cta">
          <div className="camp__featured-side-stat camp__featured-side-stat--countdown">
            <span className="camp__featured-side-label">Ends in</span>
            <span className="camp__featured-countdown">
              <span>{countdown.d}</span>d <span>{countdown.h}</span>h{' '}
              <span>{countdown.m}</span>m
            </span>
          </div>
          <a className="cta cta--primary" href={campaign.cta.url} target="_blank" rel="noreferrer">
            {campaign.cta.label}
            <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}
