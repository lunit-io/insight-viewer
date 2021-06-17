import { useState, useEffect } from 'react'
import { Viewport } from '../Context/Viewport/types'
import { ViewportContextDefaultValue } from '../Context/Viewport/const'
import { shouldSetInitialViewportMessage } from '../utils/messageService'

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

  useEffect(() => {
    shouldSetInitialViewportMessage.sendMessage(true)
  }, [])

  return {
    viewport,
    setViewport,
  }
}
