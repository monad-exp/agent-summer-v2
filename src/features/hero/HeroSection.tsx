import { SectionFrame } from '../../components/SectionFrame'
import { PathA } from './PathA'
import { PathB } from './PathB'

export function HeroSection() {

  return (
    <section className="hero" data-screen-label="01 Hero">
      <SectionFrame>
        <div className="hero__head-row">
          <h1 className="hero__headline">
            Built for agents. <br />
            <span style={{ color: '#8270FF' }}>Built on Monad.</span>
          </h1>
          <span className="hero__head-eyebrow">
            {/* <strong>Summer Long</strong> */}
          </span>
        </div>

        <p className="hero__tag">
          The agent-native hub on Monad. Bring your own autonomous agent or deploy a new one — either path, your agent pays its own way via x402 from a single MON wallet.
        </p>

        <div className="hero__paths">
          <PathA />
          <PathB />
        </div>
      </SectionFrame>
    </section>
  )
}
