import { useEffect, useState } from 'react'
import { pad } from '../lib/utils'

interface CountdownDisplay {
  d: string
  h: string
  m: string
}

export function useCountdown(endsAt: Date): CountdownDisplay {
  const getRemaining = (): CountdownDisplay => {
    const diffMs = Math.max(0, endsAt.getTime() - Date.now())
    const totalSeconds = Math.floor(diffMs / 1000)
    const d = Math.floor(totalSeconds / 86400)
    const h = Math.floor((totalSeconds % 86400) / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    return { d: String(d), h: pad(h), m: pad(m) }
  }

  const [display, setDisplay] = useState<CountdownDisplay>(getRemaining)

  useEffect(() => {
    const id = setInterval(() => setDisplay(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [endsAt])

  return display
}
