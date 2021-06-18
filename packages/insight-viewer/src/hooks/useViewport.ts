import { useState } from 'react'
import { Viewport, BasicViewport } from '../Context/Viewport/types'
import { ViewportContextDefaultValue } from '../Context/Viewport/const'

export default function useViewport(
  initial?: Partial<BasicViewport>
): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
} {
  const [viewport, setViewport] = useState({
    ...ViewportContextDefaultValue,
    ...(initial ? { _initial: initial } : {}),
  })

  return {
    viewport,
    setViewport,
  }
}
