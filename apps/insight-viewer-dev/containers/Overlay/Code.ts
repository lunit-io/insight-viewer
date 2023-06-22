export const CODE = `\
  import { useRef } from 'react'
  import InsightViewer, { useImage } from '@lunit/insight-viewer'
  import { useViewport } from '@lunit/insight-viewer/viewport

  import type { Viewport } from '@lunit/insight-viewer/viewport'

  const style = {
    width: '500px',
    height: '500px'
  }

  function OverlayLayer({ scale, hflip, vflip, x, y, invert }: { viewport: Viewport }) {
    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', color: 'blue' }}>
      scale: <span data-cy-scale>{scale.toFixed(2)}</span>
      hflip/vflip: <span data-cy-hflip>{hflip}</span> / <span data-cy-vflip>{vflip}</span>
      translation: <span data-cy-x>{x?.toFixed(2)}</span> / <span data-cy-y>{y?.toFixed(2)}</span>
      invert: <span data-cy-invert>{invert}</span>
    </div>
  }

  export default function Viewer() {
    const viewerRef = useRef<HTMLDivElement>(null)

    const { image } = useImage({
      wadouri: IMAGE_ID,
    })

    const { viewport, setViewport } = useViewport({
      image,
      viewerRef,
    })

    return (
      <div style={style}>
        <InsightViewer
          viewerRef={viewerRef}
          image={image}
          viewport={viewport}
          onViewportChange={setViewport}
        >
          <OverlayLayer viewport={viewport} />
        </InsightViewer>
      </div>
    )
  }
  `
