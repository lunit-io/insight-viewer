import OSDViewer, {
  ScalebarLocation,
  ViewportProps,
  TooltipOverlayProps,
  CanvasOverlayProps,
  OSDViewerRef,
} from '@lunit/osd-react-renderer'
import OpenSeadragon from 'openseadragon'
import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import ZoomController, { ZoomControllerProps } from './ZoomController'

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .navigator {
    width: 160px !important;
    height: 160px !important;
    border: solid 1px rgba(134, 148, 177, 0.16) !important;
    background-color: #fff !important;
    margin-top: 16px !important;
    margin-right: 16px !important;
    border-radius: 4px;
  }
  .displayregion {
    border: 2px solid #5a79e3 !important;
  }
`

const DEFAULT_CONTROLLER_MIN_ZOOM: number = 0.3125
const DEFAULT_CONTROLLER_MAX_ZOOM: number = 160
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
  const [viewportZoom, setViewportZoom] = useState<number>(1)
  const [refPoint, setRefPoint] = useState<OpenSeadragon.Point>()
  const [rotation, setRotation] = useState<number>(0)
  const [scaleFactor, setScaleFactor] = useState<number>(1)

  const canvasOverlayRef = useRef(null)
  const osdViewerRef = useRef<OSDViewerRef>(null)

  const refreshScaleFactor = useCallback(() => {
    const viewer = osdViewerRef.current?.viewer
    if (!viewer) {
      return
    }
    const imageWidth = viewer.world.getItemAt(0).getContentSize().x
    const microscopeWidth1x = ((imageWidth * DEMO_MPP) / 25400) * 96 * 10
    const viewportWidth = viewer.viewport.getContainerSize().x
    setScaleFactor(microscopeWidth1x / viewportWidth)
  }, [])

  const handleViewportOpen = useCallback<
    NonNullable<ViewportProps['onOpen']>
  >(() => {
    refreshScaleFactor()
  }, [refreshScaleFactor])

  const handleViewportResize = useCallback<
    NonNullable<ViewportProps['onResize']>
  >(() => {
    refreshScaleFactor()
  }, [refreshScaleFactor])

  const handleViewportRotate = useCallback<
    NonNullable<ViewportProps['onRotate']>
  >(
    ({ eventSource: viewer, degrees }) => {
      if (viewer == null || degrees == null) {
        return
      }
      refreshScaleFactor()
      setRotation(degrees)
    },
    [refreshScaleFactor]
  )

  const handleViewportZoom = useCallback<NonNullable<ViewportProps['onZoom']>>(
    ({ eventSource: viewer, zoom, refPoint }) => {
      if (viewer == null || zoom == null) {
        return
      }
      setViewportZoom(zoom)
      setRefPoint(refPoint || undefined)
    },
    []
  )

  const handleControllerZoom = useCallback<
    NonNullable<ZoomControllerProps['onZoom']>
  >(
    zoom => {
      setViewportZoom(zoom * scaleFactor)
    },
    [scaleFactor]
  )

  return (
    <Container>
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
        ref={osdViewerRef}
      >
        <viewport
          zoom={viewportZoom}
          refPoint={refPoint}
          rotation={rotation}
          onOpen={handleViewportOpen}
          onResize={handleViewportResize}
          onRotate={handleViewportRotate}
          onZoom={handleViewportZoom}
          maxZoomLevel={DEFAULT_CONTROLLER_MAX_ZOOM * scaleFactor}
          minZoomLevel={DEFAULT_CONTROLLER_MIN_ZOOM * scaleFactor}
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
      <ZoomController
        zoom={viewportZoom / scaleFactor}
        maxZoomLevel={DEFAULT_CONTROLLER_MAX_ZOOM}
        minZoomLevel={DEFAULT_CONTROLLER_MIN_ZOOM}
        onZoom={handleControllerZoom}
      />
    </Container>
  )
}

export default App
