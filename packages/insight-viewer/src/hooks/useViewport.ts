import { useState } from 'react'
import { Viewport, BasicViewport } from '../types'

export function useViewport(defaultViewport?: Partial<BasicViewport>): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
  resetViewport: () => void
} {
  const [viewport, setViewport] = useState<Viewport>({
    ...(defaultViewport ? { _default: defaultViewport } : {}),
  })

  function resetViewport() {
    setViewport({
      ...viewport,
      _reset: defaultViewport,
    })
  }

  return {
    viewport,
    setViewport,
    resetViewport,
  }
}
