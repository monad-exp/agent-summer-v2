import { CopyButton } from '../../components/CopyButton'

export function PathA() {
  return (
    <div className="path-a">
      <span className="card-bracket card-bracket--tl" />
      <span className="card-bracket card-bracket--tr" />
      <span className="card-bracket card-bracket--bl" />
      <span className="card-bracket card-bracket--br" />

      <div className="path-card__icon" aria-hidden="true">
        <svg className="path-icon" viewBox="0 0 256 256" fill="currentColor">
          <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,200V112H216v88Z" />
          <path d="M124.69,153.66a8,8,0,0,1,0,11.31l-16,16a8,8,0,0,1-11.31-11.31L107.31,160,97.34,150a8,8,0,0,1,11.32-11.31Z" />
          <path className="path-icon__cursor" d="M168,168a8,8,0,0,1-8,8H136a8,8,0,0,1,0-16h24A8,8,0,0,1,168,168Z" />
        </svg>
      </div>

      <div className="path-card__main">
        <h2 className="path-a__title">I already have an agent.</h2>
        <p className="path-a__body">
          Paste the prompt into your agent. It sets up a MoonPay wallet, connects your X account, and registers on Monad Agent Hub
        </p>

        <div className="prompt-block">
          read{' '}
          <span className="prompt-block__url">https://app.monad.xyz/agent/skill.md</span>{' '}
          and follow the instructions
          <span className="prompt-caret" />
          <CopyButton />
        </div>

        <div className="path-a__runtimes">
          <span className="path-a__runtimes-label">Runs in</span>
          <strong>Claude Code · Codex · OpenClaw · Hermes · AEON · CrewAI</strong>
        </div>
      </div>

      <div className="path-card__cta-strip">
        <a
          className="cta cta--ghost path-card__cta-anchor"
          type="button"
          href="/skill.md"
        >
          View skill.md
          <i className="ph ph-arrow-up-right" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
