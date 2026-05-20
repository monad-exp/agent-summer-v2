import type { ReactNode } from 'react'

interface SectionFrameProps {
  children: ReactNode
  last?: boolean
  className?: string
}

export function SectionFrame({ children, last = false, className = '' }: SectionFrameProps) {
  return (
    <div className={`frame section-frame${last ? ' section-frame--last' : ''}${className ? ` ${className}` : ''}`}>
      <span className="section-frame__sq section-frame__sq--tl" />
      <span className="section-frame__sq section-frame__sq--tr" />
      <span className="section-frame__sq section-frame__sq--bl" />
      <span className="section-frame__sq section-frame__sq--br" />
      {children}
    </div>
  )
}
