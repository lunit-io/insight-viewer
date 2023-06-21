export const CODE = `\
import { useRef, useEffect, useCallback } from 'react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'

import type { Viewport } from '@lunit/insight-viewer/viewport'

const style = {
  width: '500px',
  height: '500px'
}

export default function App() {
  const viewerRef = useRef<HTMLDivElement>(null)

  const { loadingState, image } = useImage({
    wadouri: IMAGES[0],
  })

  const { viewport, setViewport, resetViewport, initialized } = useViewport({
    image,
    viewerRef,
    options: { fitScale: false },
    getInitialViewport: (prevViewport) => ({ ...prevViewport, ...INITIAL_VIEWPORT1 }),
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

  // update viewport with keyboard event
  useEffect(() => {
    function handleKeyDown({ code }: KeyboardEvent) {
      if (code === 'KeyS') {
        updateViewport('y', viewport.y + 10)
      }
      if (code === 'KeyW') {
        updateViewport('y', viewport.y - 10)
      }
      if (code === 'KeyD') {
        updateViewport('x', viewport.x + 10)
      }
      if (code === 'KeyA') {
        updateViewport('x', viewport.x - 10)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setViewport])

  return (
    <div>
      <button type="button" onClick={resetViewport}>reset viewport</button>
      <input
        type="range"
        id="y"
        name="y"
        min="0"
        max="100"
        step="10"
        onChange={(e) => {
          updateViewport('y', Number(e.target.value))
        }}
        className="y-control"
        value={viewport?.y ?? 0}
      />
      <input
        type="checkbox"
        onChange={(e) => updateViewport('invert', e.target.checked)}
        checked={viewport.invert}
      />
      <input
        type="checkbox"
        onChange={(e) => updateViewport('hflip', e.target.checked)}
        checked={viewport?.hflip ?? false}
      />
      <input
        type="checkbox"
        onChange={(e) => updateViewport('vflip', e.target.checked)}
        checked={viewport?.vflip ?? false}
      />
      <div style={style}>
        <InsightViewer
          viewerRef={viewerRef}
          image={image}
          viewport={viewport}
          onViewportChange={setViewport}
        />
      </div>
    </div>
  )
}
`
