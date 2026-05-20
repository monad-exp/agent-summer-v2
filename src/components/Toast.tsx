import { useToastStore } from '../stores/toastStore'
import type { Toast as ToastType } from '../types/toast'

interface ToastItemProps {
  toast: ToastType
}

function ToastItem({ toast }: ToastItemProps) {
  const dismiss = useToastStore((s) => s.dismiss)

  return (
    <div className={`toast toast--${toast.variant}`} role="status">
      <div className="toast__indicator">
        <i className="ph ph-check-circle" aria-hidden="true" />
      </div>
      <div className="toast__body">
        <h4 className="toast__title">{toast.title}</h4>
        {toast.message && <p className="toast__message">{toast.message}</p>}
        {toast.cta && (
          <button className="toast__cta" type="button">
            {toast.cta.icon && <i className={`ph ${toast.cta.icon}`} aria-hidden="true" />}
            {toast.cta.label}
          </button>
        )}
      </div>
      <button
        className="toast__close"
        type="button"
        aria-label="Dismiss"
        onClick={() => dismiss(toast.id)}
      >
        <i className="ph ph-x" aria-hidden="true" />
      </button>
    </div>
  )
}

export function ToastStack() {
  const toasts = useToastStore((s) => s.toasts)

  if (toasts.length === 0) return null

  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  )
}
