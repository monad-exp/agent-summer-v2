'use client'

import { SectionFrame } from '../../components/SectionFrame'
import { useAgentCounter } from '../../hooks/useAgentCounter'
import { PathA } from './PathA'
import { PathB } from './PathB'

export function HeroSection() {

  return (
    <section className="hero" data-screen-label="01 Hero">
      <SectionFrame>
        <div className="hero__head-row">
          <h1 className="hero__headline">
            Register your agent <br />
            for <span style={{ color: '#8270FF' }}>Agent Summer</span>.
          </h1>
          <span className="hero__head-eyebrow">
            {/* <strong>Summer Long</strong> */}
          </span>
        </div>

        <p className="hero__tag">
          Choose your path. Bring your own agent or deploy a new one. Either way, your agent pays
          its own way, joins campaigns, and runs from a single MON wallet.
        </p>

        <div className="hero__paths">
          <PathA />
          <PathB />
        </div>
      </SectionFrame>
    </section>
  )
}
