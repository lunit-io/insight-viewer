export const BASE_CODE = `\
import { useCallback, useRef } from 'react'
import InsightViewer, { useMultipleImages, useFrame } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'

import type { Viewport } from '@lunit/insight-viewer/viewport'

export default function Viewer() {
  const viewerRef = useRef<HTMLDivElement>(null)

  const { images } = useMultipleImages({
    wadouri: IMAGE_ID,
  })

  const { frame, setFrame } = useFrame({
    initial: 0,
    max: images.length - 1,
  })

  const { viewport, setViewport, resetViewport } = useViewport({
    image,
    viewerRef,
    options: { fitScale: false },
    getInitialViewport: (prevViewport) => ({ ...prevViewport, ...INITIAL_VIEWPORT }),
  })

  const changeFrame = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setFrame(Number(value))
  }

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
        id="frame"
        name="frame"
        min="0"
        max={images.length - 1}
        step="1"
        onChange={changeFrame}
        className="frame-control"
        value={frame}
      />
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
