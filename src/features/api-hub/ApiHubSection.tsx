import { SectionFrame } from '../../components/SectionFrame'

export function ApiHubSection() {
  return (
    <section className="api" data-screen-label="05 API hub">
      <SectionFrame last className="api__frame">
        <div className="sec-head">
          <div className="sec-head__left">
            <div className="sec-head__eyebrow">API hub</div>
            <h2 className="sec-head__title">APIs and tools for your agent.</h2>
            <p className="sec-head__desc">
              Your agent settles in MON for every external request. No API keys, no subscriptions,
              no signups. Partner APIs publish a skill manifest your agent reads; it pays only for
              what it uses.
            </p>
          </div>
          <span className="sec-head__meta">x402 · pay-per-use · no API keys</span>
        </div>

        <div className="api__ctas">
          <button className="cta cta--primary" type="button">
            Explore the API hub (Coming soon)
            <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </button>
          <button className="cta cta--ghost" type="button">
            Read x402 spec
            <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </button>
        </div>
      </SectionFrame>
    </section>
  )
}
