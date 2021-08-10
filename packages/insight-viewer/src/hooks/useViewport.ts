/**
 * @fileoverview Handles the Viewer's viewport.
 */
import { useState } from 'react'
import { Viewport, BasicViewport } from '../types'
import { DEFAULT_VIEWPORT } from '../const'

/**
 * @param defaultViewport The user-defined default viewport.
 * @returns {viewport} The viewport which is used as a Viewer's viewport prop.
 * @returns {setViewport} The viewport setter which is used as a Viewer's onViewportChange prop.
 * @returns {resetViewport} It resets a Viewer's viewport.
 * @returns {initialized} Whether the viewport is initialized or not.
 */
export function useViewport(defaultViewport?: Partial<BasicViewport>): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
  resetViewport: () => void
  initialized: boolean
} {
  const [viewport, setViewport] = useState<Viewport>({
    ...(defaultViewport
      ? { ...DEFAULT_VIEWPORT, _default: defaultViewport }
      : DEFAULT_VIEWPORT),
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
    initialized: viewport.scale !== DEFAULT_VIEWPORT.scale, // DEFAULT_VIEWPORT.scale is 0.
  }
}
