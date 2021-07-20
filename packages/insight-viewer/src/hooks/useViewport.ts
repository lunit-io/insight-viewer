import { useState } from 'react'
import { Viewport, BasicViewport } from '../types'
import { DefaultViewport } from '../const'

export default function useViewport(defaultViewport?: Partial<BasicViewport>): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
  resetViewport: () => void
} {
  const [viewport, setViewport] = useState({
    ...DefaultViewport,
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
