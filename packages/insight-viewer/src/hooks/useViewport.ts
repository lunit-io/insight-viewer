/* eslint-disable no-underscore-dangle */
import { useState } from 'react'
import { Viewport, BasicViewport } from '../types'
import { DefaultViewport } from '../const'

export default function useViewport(initial?: Partial<BasicViewport>): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
  resetViewport: () => void
} {
  const [viewport, setViewport] = useState({
    ...DefaultViewport,
    ...(initial ? { _initial: initial } : {}),
  })

  function resetViewport() {
    setViewport({
      ...viewport,
      _reset: initial,
    })
  }

  return {
    viewport,
    setViewport,
    resetViewport,
  }
}
