import { useState } from 'react'
import { Viewport } from '../Context/Viewport/types'
import { ViewportContextDefaultValue } from '../Context/Viewport/const'

export default function useViewport(
  initial?: Partial<Viewport>
): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
} {
  const [viewport, setViewport] = useState({
    ...ViewportContextDefaultValue,
    ...(initial ?? {}),
  })

  return {
    viewport,
    setViewport,
  }
}
