import { useEffect, useState } from 'react'

const TICK_INTERVAL_MS = 4000
const BUMP_PROBABILITY = 0.3
const FLASH_DURATION_MS = 600

interface AgentCounter {
  count: number
  flashing: boolean
}

export function useAgentCounter(initial: number): AgentCounter {
  const [state, setState] = useState<AgentCounter>({ count: initial, flashing: false })

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() < BUMP_PROBABILITY) {
        setState((prev) => ({ count: prev.count + 1, flashing: true }))
        setTimeout(
          () => setState((prev) => ({ ...prev, flashing: false })),
          FLASH_DURATION_MS,
        )
      }
    }, TICK_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return state
}
