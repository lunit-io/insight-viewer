import OSDViewer, {
  ScalebarLocation,
  ViewportProps,
  TooltipOverlayProps,
  CanvasOverlayProps,
} from '@lunit/osd-react-renderer'
import OpenSeadragon from 'openseadragon'
import { useCallback, useRef, useState } from 'react'

const DEFAULT_MIN_ZOOM: number = 0.3125
const DEFAULT_MAX_ZOOM: number = 160
const DEMO_MPP = 0.263175
const MICRONS_PER_METER = 1e6
const RADIUS_UM = 281.34

const onCanvasOverlayRedraw: CanvasOverlayProps['onRedraw'] = (
  canvas: HTMLCanvasElement
) => {
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = '#000'
    ctx.fillRect(50, 50, 5000, 5000)
  }
}

const onTooltipOverlayRedraw: TooltipOverlayProps['onRedraw'] = ({
  tooltipCoord,
  overlayCanvasEl,
  viewer,
}) => {
  const ctx = overlayCanvasEl.getContext('2d')
  if (ctx && tooltipCoord) {
    const radiusPx = RADIUS_UM / DEMO_MPP
    const sizeRect = new OpenSeadragon.Rect(0, 0, 2, 2)
    const lineWidth = viewer.viewport.viewportToImageRectangle(
      viewer.viewport.viewerElementToViewportRectangle(sizeRect)
    ).width
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.arc(tooltipCoord.x, tooltipCoord.y, radiusPx, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()
  }
}

function App() {
  const [zoom, setZoom] = useState(10)
  const [refPoint, setRefPoint] = useState<OpenSeadragon.Point>()
  const [rotation, setRotation] = useState(0)

  const physicalWidthPx = 700
  const microscopeWidth1x = physicalWidthPx * 10

  const onZoom = useCallback<NonNullable<ViewportProps['onZoom']>>(
    ({ eventSource: viewer, zoom, refPoint }) => {
      if (viewer == null || zoom == null) {
        return
      }
      const viewportSize = viewer.viewport.getContainerSize()
      const scaleFactor = microscopeWidth1x / viewportSize.x
      viewer.viewport.maxZoomLevel = DEFAULT_MAX_ZOOM * scaleFactor
      viewer.viewport.minZoomLevel = 0.1 * scaleFactor
      setZoom(zoom)
      setRefPoint(refPoint || undefined)
    },
    [microscopeWidth1x]
  )
  const canvasOverlayRef = useRef(null)

  const onRotate = useCallback<NonNullable<ViewportProps['onRotate']>>(
    ({ eventSource: viewer, degrees }) => {
      if (viewer == null || degrees == null) {
        return
      }
      setRotation(degrees)
    },
    []
  )

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <OSDViewer
        options={{
          imageLoaderLimit: 8,
          smoothTileEdgesMinZoom: Infinity,
          showNavigator: true,
          showNavigationControl: false,
          timeout: 60000,
          navigatorAutoResize: false,
          preserveImageSizeOnResize: true,
          showRotationControl: true,
          zoomPerScroll: 1.3,
          animationTime: 0.3,
          gestureSettingsMouse: {
            clickToZoom: false,
            dblClickToZoom: false,
          },
          gestureSettingsTouch: {
            flickEnabled: false,
            clickToZoom: false,
            dblClickToZoom: false,
          },
        }}
      >
        <viewport
          zoom={zoom}
          refPoint={refPoint}
          rotation={rotation}
          onZoom={onZoom}
          onRotate={onRotate}
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
        <canvasOverlay
          ref={canvasOverlayRef}
          onRedraw={onCanvasOverlayRedraw}
        />
        <tooltipOverlay onRedraw={onTooltipOverlayRedraw} />
      </OSDViewer>
    </div>
  )
}

export default App
