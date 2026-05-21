'use client'

import { SectionFrame } from '../../components/SectionFrame'
import { useAgentCounter } from '../../hooks/useAgentCounter'
import { PathA } from './PathA'
import { PathB } from './PathB'

const INITIAL_AGENT_COUNT = 1247

export function HeroSection() {
  const { count, flashing } = useAgentCounter(INITIAL_AGENT_COUNT)

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

        <div className="hero__agents-registered">
          <span
            id="agentsRegistered"
            style={{ transition: 'color .2s', color: flashing ? '#4ade80' : '' }}
          >
            {count}
          </span>{' '}
          agents registered
        </div>
      </SectionFrame>
    </section>
  )
}
