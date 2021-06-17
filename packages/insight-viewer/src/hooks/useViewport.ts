import { useState } from 'react'
import { Viewport } from '../Context/Viewport/types'
import { ViewportContextDefaultValue } from '../Context/Viewport/const'

export default function useViewport(
  initial?: Viewport
): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
} {
  const [viewport, setViewport] = useState(
    initial ?? ViewportContextDefaultValue
  )

  return {
    viewport,
    setViewport,
  }
}
