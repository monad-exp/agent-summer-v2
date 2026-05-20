import { useCallback, useRef, useState } from 'react'

const PROMPT_TEXT = 'read https://app.monad.xyz/agent/skill.md and follow the instructions'
const REVERT_DELAY_MS = 1500

export function CopyButton() {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = useCallback(() => {
    navigator.clipboard?.writeText(PROMPT_TEXT).catch(() => {})
    setCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), REVERT_DELAY_MS)
  }, [])

  return (
    <button
      className="prompt-block__copy"
      type="button"
      data-state={copied ? 'copied' : 'default'}
      onClick={handleClick}
    >
      {!copied && (
        <svg className="icon-copy" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
        </svg>
      )}
      {copied && (
        <svg className="icon-check" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      )}
      <span className="copy-label">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}
