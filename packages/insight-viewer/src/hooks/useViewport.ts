/**
 * @fileoverview Handles the Viewer's viewport.
 */
import { useState } from 'react'
import { Viewport, BasicViewport } from 'types'
import { BASE_VIEWPORT } from 'const'

/**
 * @param initialViewport The user-defined initial viewport.
 * @returns {viewport} The viewport which is used as a Viewer's viewport prop.
 * @returns {setViewport} The viewport setter which is used as a Viewer's onViewportChange prop.
 * @returns {resetViewport} It resets a Viewer's viewport.
 * @returns {initialized} Whether the viewport is initialized or not.
 */
export function useViewport(initialViewport?: Partial<BasicViewport>): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
  resetViewport: () => void
  initialized: boolean
} {
  const [viewport, setViewport] = useState<Viewport>({
    ...(initialViewport ? { ...BASE_VIEWPORT, _initialViewport: initialViewport } : BASE_VIEWPORT),
  })

  function resetViewport() {
    setViewport({
      ...viewport,
      _resetViewport: initialViewport,
    })
  }

  return {
    viewport,
    setViewport,
    resetViewport,
    initialized: viewport.scale !== BASE_VIEWPORT.scale, // BASE_VIEWPORT.scale is 0.
  }
}
