'use client'

import type { CSSProperties } from 'react'
import { signIn, signOut, useSession } from '@/lib/auth-client'

const NEW_ACCOUNT_DAYS = 30
const MS_PER_DAY = 1000 * 60 * 60 * 24

function daysSince(date: Date | string): number {
  const then = typeof date === 'string' ? new Date(date) : date
  return Math.floor((Date.now() - then.getTime()) / MS_PER_DAY)
}

const baseButton: CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '6px 12px',
  borderRadius: 6,
  border: '1px solid rgba(255, 255, 255, 0.12)',
  cursor: 'pointer',
}

const primaryButton: CSSProperties = {
  ...baseButton,
  background: '#fff',
  color: '#0A0A0D',
  borderColor: '#fff',
}

const ghostButton: CSSProperties = {
  ...baseButton,
  background: 'transparent',
  color: 'rgba(255, 255, 255, 0.7)',
}

const handleStyle: CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: 11,
  color: 'rgba(255, 255, 255, 0.7)',
  letterSpacing: '0.08em',
}

const ageBaseStyle: CSSProperties = {
  position: 'absolute',
  right: 0,
  top: 'calc(100% + 6px)',
  whiteSpace: 'nowrap',
  fontFamily: 'var(--mono)',
  fontSize: 10,
  letterSpacing: '0.06em',
  padding: '4px 8px',
  borderRadius: 4,
}

const ageNeutralStyle: CSSProperties = {
  ...ageBaseStyle,
  color: 'rgba(255, 255, 255, 0.5)',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
}

const ageWarningStyle: CSSProperties = {
  ...ageBaseStyle,
  color: '#f5b942',
  background: 'rgba(245, 185, 66, 0.08)',
  border: '1px solid rgba(245, 185, 66, 0.25)',
}

function formatAge(days: number): string {
  if (days < 60) return `${days} day${days === 1 ? '' : 's'} old`
  if (days < 365) {
    const months = Math.floor(days / 30)
    return `${months} months old`
  }
  const years = Math.floor(days / 365)
  return `${years} year${years === 1 ? '' : 's'} old`
}

export function SignInButton() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return (
      <button disabled style={{ ...ghostButton, opacity: 0.5, cursor: 'default' }}>
        …
      </button>
    )
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn.social({ provider: 'twitter', callbackURL: '/' })}
        style={primaryButton}
      >
        Sign in with X
      </button>
    )
  }

  const xCreatedAt = session.user.xCreatedAt
  const ageDays = xCreatedAt ? daysSince(xCreatedAt) : null
  const isNewAccount = ageDays !== null && ageDays < NEW_ACCOUNT_DAYS

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
      <span style={handleStyle}>@{session.user.email}</span>
      <button onClick={() => signOut()} style={ghostButton}>
        Sign out
      </button>
      {ageDays !== null && (
        <p style={isNewAccount ? ageWarningStyle : ageNeutralStyle}>
          X account · {formatAge(ageDays)}
        </p>
      )}
    </div>
  )
}
