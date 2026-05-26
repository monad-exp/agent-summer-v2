'use client'

import { useState } from 'react'
import { StatusBadge } from '../../components/StatusBadge'
import type { Campaign } from '../../types/campaign'
import { FeaturedCampaign } from './FeaturedCampaign'

interface CampaignsClientProps {
  campaigns: Campaign[]
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function CampaignsClient({ campaigns }: CampaignsClientProps) {
  const defaultFeatured =
    campaigns.find((c) => c.status === 'active') ?? campaigns[0] ?? null

  const [featuredId, setFeaturedId] = useState<string | null>(
    defaultFeatured?.id ?? null,
  )
  const [swapping, setSwapping] = useState(false)

  const featured = campaigns.find((c) => c.id === featuredId) ?? defaultFeatured
  const others = campaigns
    .filter((c) => c.id !== featured?.id)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
  const placeholders = Math.max(0, 3 - others.length)

  function handleSelect(id: string) {
    if (id === featured?.id || swapping) return
    setSwapping(true)
    setTimeout(() => {
      setFeaturedId(id)
      setSwapping(false)
    }, 180)
  }

  const featuredIndex = featured ? campaigns.indexOf(featured) : 0

  return (
    <>
      {featured && (
        <div
          className={
            swapping
              ? 'camp__featured-wrap camp__featured-wrap--out'
              : 'camp__featured-wrap'
          }
        >
          <FeaturedCampaign
            key={featured.id}
            campaign={featured}
            number={featuredIndex + 1}
          />
        </div>
      )}

      <div className="camp__upcoming-label">All Campaigns</div>
      <div className="camp__upcoming">
        {others.map((c) => {
          const isLive = c.status === 'active'
          return isLive ? (
            <button
              key={c.id}
              type="button"
              className="camp__upcoming-card camp__upcoming-card--clickable"
              onClick={() => handleSelect(c.id)}
            >
              <StatusBadge variant="success" label="Live Now" />
              <div className="camp__upcoming-title">{c.title}</div>
              <div className="camp__upcoming-desc">{c.summary}</div>
              <div className="camp__upcoming-date">{formatDate(c.startsAt)}</div>
            </button>
          ) : (
            <button
              key={c.id}
              type="button"
              className="camp__upcoming-card camp__upcoming-card--clickable"
              onClick={() => handleSelect(c.id)}
            >
              <div className="camp__upcoming-status">Coming Soon</div>
              <div className="camp__upcoming-title">{c.title}</div>
              <div className="camp__upcoming-desc">{c.summary}</div>
              <div className="camp__upcoming-date">{formatDate(c.startsAt)}</div>
            </button>
          )
        })}
        {Array.from({ length: placeholders }, (_, i) => (
          <div key={`ph-${i}`} className="camp__upcoming-card">
            <div className="camp__upcoming-status">Coming Soon</div>
          </div>
        ))}
      </div>
    </>
  )
}
