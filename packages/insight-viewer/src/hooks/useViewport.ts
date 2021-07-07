import { useState } from 'react'
import { Viewport, BasicViewport } from '../types'
import { DefaultViewport } from '../const'

export default function useViewport(initial?: Partial<BasicViewport>): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
} {
  const [viewport, setViewport] = useState({
    ...DefaultViewport,
    ...(initial ? { _initial: initial } : {}),
  })

  return {
    viewport,
    setViewport,
  }
}
