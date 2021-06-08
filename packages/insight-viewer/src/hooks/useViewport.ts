import { useContext } from 'react'
import ViewportContext from '../Context/Viewport'
import { Viewport, UpdateViewport } from '../Context/Viewport/types'
import { viewportMessage } from '../utils/messageService'

export default function useViewport(): {
  viewport: Viewport
  setViewport: (update: UpdateViewport) => void
} {
  const viewport = useContext(ViewportContext)

  function setViewport(update: UpdateViewport): void {
    viewportMessage.sendMessage(update(viewport))
  }

  return {
    viewport,
    setViewport,
  }
}
