export function PathB() {
  return (
    <div className="path-b">
      <span className="card-bracket card-bracket--tl" />
      <span className="card-bracket card-bracket--tr" />
      <span className="card-bracket card-bracket--bl" />
      <span className="card-bracket card-bracket--br" />

      <i className="ph ph-cpu path-card__icon" aria-hidden="true" />

      <div className="path-card__main">
        <h2 className="path-b__title">Create a new agent.</h2>
        <p className="path-b__body">
          Clawdi spins up a hosted agent on the channel you want.
          <br />
          Start free. No code. Pay-per-use in MON. 
        </p>
        <div className="path-b__channels">
          <span className="path-b__channels-label">Deploys to</span>
          <strong>Telegram · WhatsApp · Discord</strong>
        </div>
      </div>

      <div className="path-card__cta-strip">
        <a
          className="cta cta--primary path-b__cta"
          href="https://www.clawdi.ai/?utm_source=monad"
          target="_blank"
          rel="noopener noreferrer"
        >
          Deploy with Clawdi
          <i className="ph ph-arrow-up-right" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
