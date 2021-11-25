import OSDViewer, {
  ScalebarLocation,
  ViewportProps,
  TooltipOverlayProps,
  CanvasOverlayProps,
  OSDViewerRef,
} from '@lunit/osd-react-renderer'
import OpenSeadragon from 'openseadragon'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import ZoomController, { ZoomControllerProps } from './ZoomController'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
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

const OSDContainer = styled.div`
  flex: 1;
  height: 100%;
`

const Links = styled.div`
  width: 100px;
  a {
    display: block;
  }
`

const DEFAULT_CONTROLLER_MIN_ZOOM: number = 0.3125
const DEFAULT_CONTROLLER_MAX_ZOOM: number = 160
const DEMO_MPP = 0.263175
const MICRONS_PER_METER = 1e6
const RADIUS_UM = 281.34
const VIEWER_OPTIONS = {
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
}

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

let timer: ReturnType<typeof setTimeout>

function App() {
  const [viewportZoom, setViewportZoom] = useState<number>(1)
  const [refPoint, setRefPoint] = useState<OpenSeadragon.Point>()
  const [rotation, setRotation] = useState<number>(0)
  const [scaleFactor, setScaleFactor] = useState<number>(1)
  const [rectSize, setRectSize] = useState<[number, number]>([5000, 5000])

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

  const handleUpdatedCanvasOverlayRedraw: CanvasOverlayProps['onRedraw'] =
    useCallback(
      (canvas: HTMLCanvasElement, viewer: OpenSeadragon.Viewer) => {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = 'rgba(0,0,0,0.3)'
          ctx.fillRect(50, 50, rectSize[0], rectSize[1])
        }
        if (viewer.world && viewer.world.getItemAt(0)) {
          const imgSize = viewer.world.getItemAt(0).getContentSize()
          clearTimeout(timer)
          timer = setTimeout(() => {
            setRectSize([Math.random() * imgSize.x, Math.random() * imgSize.y])
          }, 5000)
        }
      },
      [rectSize]
    )

  return (
    <BrowserRouter>
      <Container>
        <Links>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/test-custom">CUSTOM IMG URL</NavLink>
          <NavLink to="/no-overlay">NO OVERLAY</NavLink>
          <NavLink to="/test">TEST</NavLink>
          <NavLink to="/destroy">TEST DESTROY</NavLink>
        </Links>
        <Switch>
          <OSDContainer>
            <Route exact path="/test">
              <OSDViewer options={VIEWER_OPTIONS} ref={osdViewerRef}>
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
                  onRedraw={handleUpdatedCanvasOverlayRedraw}
                />
              </OSDViewer>
            </Route>
            <Route exact path="/test-custom">
              <OSDViewer options={VIEWER_OPTIONS} ref={osdViewerRef}>
                <tiledImage
                  url="https://pdl1.api.dev.scope.lunit.io/slides/dzi/metadata?file=mrxs_test/SIZE_TEST_2.mrxs"
                  tileUrlBase="https://pdl1.api.dev.scope.lunit.io/slides/images/dzi/mrxs_test/SIZE_TEST_2.mrxs"
                />
              </OSDViewer>
            </Route>
            <Route exact path="/">
              <OSDViewer options={VIEWER_OPTIONS} ref={osdViewerRef}>
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
            </Route>
            <Route exact path="/no-overlay">
              <OSDViewer options={VIEWER_OPTIONS} ref={osdViewerRef}>
                <tiledImage url="https://image-pdl1.api.opt.scope.lunit.io/slides/images/dzi/41f49f4c-8dcd-4e85-9e7d-c3715f391d6f/3/122145f9-7f68-4f85-82f7-5b30364c2323/D_202103_Lunit_NSCLC_011_IHC_22C3.svs" />
              </OSDViewer>
            </Route>
          </OSDContainer>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
