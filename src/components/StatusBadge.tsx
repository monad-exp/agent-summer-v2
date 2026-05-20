interface StatusBadgeProps {
  variant: 'success' | 'pending'
  label: string
}

export function StatusBadge({ variant, label }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${variant}`}>
      <span className="status-badge__corner status-badge__corner--tl" />
      <span className="status-badge__corner status-badge__corner--tr" />
      <span className="status-badge__corner status-badge__corner--bl" />
      <span className="status-badge__corner status-badge__corner--br" />
      <span className="status-badge__dot" />
      <span>{label}</span>
    </span>
  )
}
