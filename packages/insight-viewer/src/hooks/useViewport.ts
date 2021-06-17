import { useState } from 'react'
import { Viewport } from '../Context/Viewport/types'
import { ViewportContextDefaultValue } from '../Context/Viewport/const'

export default function useViewport(
  initial?: Partial<Viewport>
): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
} {
  const [viewport, setViewport] = useState(
    initial
      ? { ...ViewportContextDefaultValue, ...initial }
      : ViewportContextDefaultValue
  )

  return {
    viewport,
    setViewport,
  }
}
