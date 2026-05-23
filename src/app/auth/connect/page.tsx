'use client'

import { useEffect } from 'react'
import { signIn } from '@/lib/auth-client'

export default function ConnectPage() {
  useEffect(() => {
    signIn.social({ provider: 'twitter', callbackURL: '/' })
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <p style={{ fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
        Redirecting to X…
      </p>
    </div>
  )
}
