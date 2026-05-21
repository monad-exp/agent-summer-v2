'use client'

import { useToastStore } from '../../stores/toastStore'

export function PathB() {
  const showToast = useToastStore((s) => s.show)

  const handleDeploy = () => {
    showToast({
      variant: 'success',
      title: 'Agent deployed',
      message: 'Authenticate your X handle to claim your spot in Agent Summer.',
      cta: { label: 'Authenticate', icon: 'ph-x-logo' },
    })
  }

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
          Clawdi spins up a hosted OpenClaw agent on the channel you want.
          <br />
          Free. No code. Sign once, it's live.
        </p>
        <div className="path-b__channels">
          <span className="path-b__channels-label">Deploys to</span>
          <strong>Telegram · WhatsApp · Signal</strong>
        </div>
      </div>

      <div className="path-card__cta-strip">
        <button className="cta cta--primary path-b__cta" type="button" onClick={handleDeploy}>
          Deploy with Clawdi
          <i className="ph ph-arrow-up-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
