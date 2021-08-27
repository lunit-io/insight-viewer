import OSDViewer, { ScalebarLocation } from '@lunit/osd-react-renderer'
import { ViewportProps } from 'packages/osd-react-renderer/src/types'
import { useCallback, useState } from 'react'

const DEFAULT_MIN_ZOOM: number = 0.3125
const DEFAULT_MAX_ZOOM: number = 160

function App() {
  const [zoom, setZoom] = useState(10)
  const physicalWidthPx = 700
  const microscopeWidth1x = physicalWidthPx * 10

  const onZoom = useCallback<NonNullable<ViewportProps['onZoom']>>(
    event => {
      const viewer = event.eventSource
      if (viewer == null || event.zoom == null) {
        return
      }
      const viewportSize = viewer.viewport.getContainerSize()
      const scaleFactor = microscopeWidth1x / viewportSize.x
      viewer.viewport.maxZoomLevel = DEFAULT_MAX_ZOOM * scaleFactor
      viewer.viewport.minZoomLevel = 0.1 * scaleFactor
      console.log(viewer.viewport.getZoom() / scaleFactor, event.refPoint)
      setZoom(event.zoom)
    },
    [microscopeWidth1x]
  )

  const DEMO_MPP = 0.263175
  const MICRONS_PER_METER = 1e6

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
      <OSDViewer options={{}}>
        <viewport
          zoom={zoom}
          rotation={90}
          onZoom={onZoom}
          maxZoomLevel={DEFAULT_MAX_ZOOM}
          minZoomLevel={DEFAULT_MIN_ZOOM}
        />
        <tiledImage url="https://image-pdl1.api.opt.scope.lunit.io/slides/images/dzi/41f49f4c-8dcd-4e85-9e7d-c3715f391d6f/3/122145f9-7f68-4f85-82f7-5b30364c2323/D_202103_Lunit_NSCLC_011_IHC_22C3.svs" />
        <scalebar
          pixelsPerMeter={MICRONS_PER_METER / DEMO_MPP}
          xOffset={10}
          yOffset={30}
          barThickness={3}
          color="#443aff"
          fontColor="#53646d"
          backgroundColor={'rgba(255,255,255,0.5)'}
          location={ScalebarLocation.BOTTOM_RIGHT}
        />
      </OSDViewer>
    </div>
  )
}

export default App
