import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Providers } from '../lib/providers'
import '../landing.css'

export const metadata: Metadata = {
  title: '/agent — Agent Summer',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
