export const RESET_VIEWPORT_CODE = `\
import { useCallback, useEffect, useRef } from 'react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'

import type { Viewport } from '@lunit/insight-viewer/viewport'

// When changing the Image, the Viewport is always initialized.
export default function Viewer() {
  const viewerRef = useRef<HTMLDivElement>(null)

  const { image } = useImage({
    wadouri: IMAGE_ID,
  })

  const { viewport, setViewport, resetViewport } = useViewport({
    image,
    viewerRef,
    options: { fitScale: false },
    getInitialViewport: (prevViewport) => ({ ...prevViewport, ...INITIAL_VIEWPORT }),
  })

  const updateViewport = useCallback(
    (key: keyof Viewport, value: unknown) => {
      setViewport((prev: Viewport) => ({
        ...prev,
        [key]: value,
      }))
    },
    [setViewport]
  )

  return (
    <div>
      <input
        type="range"
        id="x"
        name="x"
        min="0"
        max="100"
        step="10"
        onChange={(e) => {
          updateViewport('x', Number(e.target.value))
        }}
        className="x-control"
        value={viewport?.x ?? 0}
      />
      <div style={{ width: '500px', height: '500px' }}>
        <InsightViewer
          image={image}
          viewerRef={viewerRef}
          viewport={viewport}
          onViewportChange={setViewport}
        />
      </div>
    </div>
  )
}
`
export const NON_RESET_VIEWPORT_CODE = `\
import { useCallback, useEffect, useRef } from 'react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'

import type { Viewport } from '@lunit/insight-viewer'

// When you change the Image, the previous Viewport is retained.
export default function Viewer() {
  const viewerRef = useRef<HTMLDivElement>(null)
  const currentViewportRef = useRef<Viewport>()

  const { image } = useImage({
    wadouri: IMAGE_ID,
  })

  const { viewport, setViewport, resetViewport, initialized } = useViewport({
    image,
    viewerRef,
    options: { fitScale: false },
    getInitialViewport: (prevViewport) => ({ ...prevViewport, ...(currentViewportRef.current ?? INITIAL_VIEWPORT) }),
  })

  const updateViewport = useCallback(
    (key: keyof Viewport, value: unknown) => {
      setViewport((prev: Viewport) => ({
        ...prev,
        [key]: value,
      }))
    },
    [setViewport]
  )

  useEffect(() => {
    /**
     * If viewport is the initial value, viewportRef does not initialize.
     * If you later update the viewport, use the value to assign
     * it to Ref and use it to obtain the initial viewport value.
     */
    if (!initialized) return

    currentViewportRef.current = viewport
  }, [initialized, viewport])

  /**
   * If you want to reset the Viewport,
   * call the Ref initialize and resetViewport functions
   */
  const resetViewportAndCurrentViewportRef = () => {
    currentViewportRef.current = undefined

    resetViewport()
  }

  return (
    <div>
      <input
        type="range"
        id="x"
        name="x"
        min="0"
        max="100"
        step="10"
        onChange={(e) => {
          updateViewport('x', Number(e.target.value))
        }}
        className="x-control"
        value={viewport?.x ?? 0}
      />
      <div style={{ width: '500px', height: '500px' }}>
        <InsightViewer
          image={image}
          viewerRef={viewerRef}
          viewport={viewport}
          onViewportChange={setViewport}
        />
      </div>
    </div>
  )
}
`
