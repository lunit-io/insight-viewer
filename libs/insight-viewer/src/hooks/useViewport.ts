/**
 * @fileoverview Handles the Viewer's viewport.
 */
import { useState, useEffect } from 'react'
import { Viewport, BasicViewport, ViewportOptions } from '../types'
import { BASE_VIEWPORT, DEFAULT_VIEWPORT_OPTIONS } from '../const'

interface UseViewportParams {
  initialViewport?: Partial<BasicViewport>
  options?: ViewportOptions
}

/**
 * @param initialViewport The user-defined initial viewport.
 * @returns {viewport} The viewport which is used as a Viewer's viewport prop.
 * @returns {setViewport} The viewport setter which is used as a Viewer's onViewportChange prop.
 * @returns {resetViewport} It resets a Viewer's viewport.
 * @returns {initialized} Whether the viewport is initialized or not.
 */
export function useViewport(
  { initialViewport, options = DEFAULT_VIEWPORT_OPTIONS }: UseViewportParams = { options: DEFAULT_VIEWPORT_OPTIONS }
): {
  viewport: Viewport
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>
  resetViewport: () => void
  initialized: boolean
} {
  const [viewport, setViewport] = useState<Viewport>({
    ...(initialViewport ? { ...BASE_VIEWPORT, _initialViewport: initialViewport } : BASE_VIEWPORT),
    _viewportOptions: options,
  })

  function resetViewport() {
    setViewport({
      ...viewport,
      _viewportOptions: options,
      _resetViewport: initialViewport ?? {},
    })
  }

  useEffect(() => {
    setViewport((prevViewport) => ({ ...prevViewport, _viewportOptions: { fitScale: options.fitScale } }))
  }, [options.fitScale])

  return {
    viewport,
    setViewport,
    resetViewport,
    initialized: viewport.scale !== BASE_VIEWPORT.scale, // BASE_VIEWPORT.scale is 0.
  }
}
