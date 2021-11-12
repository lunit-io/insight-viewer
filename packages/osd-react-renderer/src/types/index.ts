/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-explicit-any, no-shadow */
import OpenSeadragon from 'openseadragon'
import { ReactNode } from 'react'

export interface BaseProps {
  [key: string]: any
}

interface NodeProps {
  ref?: React.Ref<React.ReactNode>
  key?: React.Key
}

export interface OSDViewerProps {
  children?: ReactNode | undefined
  options: OpenSeadragon.Options
}

export interface DZIMetaData {
  width: number
  height: number
  tileSize: number
  tileOverlap: number
  maxLevel: number
  minLevel: number
}

type ByteRange = string

export type TileMap = {
  [key: string]: ByteRange
}

export interface OSDViewerRef {
  container: HTMLDivElement
  viewer: OpenSeadragon.Viewer
}

export interface TiledImageProps extends NodeProps {
  url: string
  tileUrlBase?: string
  dziMeta?: DZIMetaData
  tileMap?: TileMap
}

export interface ViewportEventHandlers
  extends Partial<
      Record<
        keyof typeof ViewerEventHandlers,
        OpenSeadragon.EventHandler<OpenSeadragon.ViewerEvent>
      >
    >,
    NodeProps {}

export interface ViewportProps extends ViewerProps {
  defaultZoomLevel?: number
  maxZoomLevel?: number
  minZoomLevel?: number
}

export interface ViewerProps extends ViewportEventHandlers {
  zoom: number
  rotation: number
  refPoint?: OpenSeadragon.Point
}

export enum ScalebarLocation {
  NONE,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_RIGHT,
  BOTTOM_LEFT,
}

export interface ScalebarProps extends NodeProps {
  pixelsPerMeter: number
  xOffset?: number
  yOffset?: number
  barThickness?: number
  color?: string
  fontColor?: string
  backgroundColor?: string
  location?: ScalebarLocation
  stayInsideImage?: boolean
}

export enum ViewerEventHandlers {
  onAddItemFailed = 'add-item-failed',
  onAddOverlay = 'add-overlay',
  onAnimation = 'animation',
  onAnimationFinish = 'animation-finish',
  onAnimationStart = 'animation-start',
  onCanvasClick = 'canvas-click',
  onCanvasDoubleClick = 'canvas-double-click',
  onCanvasDrag = 'canvas-drag',
  onCanvasDragEnd = 'canvas-drag-end',
  onCanvasEnter = 'canvas-enter',
  onCanvasExit = 'canvas-exit',
  onCanvasKey = 'canvas-key',
  onCanvasNonprimaryPress = 'canvas-nonprimary-press',
  onCanvasNonprimaryRelease = 'canvas-nonprimary-release',
  onCanvasPinch = 'canvas-pinch',
  onCanvasPress = 'canvas-press',
  onCanvasRelease = 'canvas-release',
  onCanvasScroll = 'canvas-scroll',
  onClearOverlay = 'clear-overlay',
  onClose = 'close',
  onConstrain = 'constrain',
  onContainerEnter = 'container-enter',
  onContainerExit = 'container-exit',
  onControlsEnabled = 'controls-enabled',
  onFlip = 'flip',
  onFullPage = 'full-page',
  onFullScreen = 'full-screen',
  onHome = 'home',
  onMouseEnabled = 'mouse-enabled',
  onNavigatorClick = 'navigator-click',
  onNavigatorDrag = 'navigator-drag',
  onNavigatorScroll = 'navigator-scroll',
  onOpen = 'open',
  onOpenFailed = 'open-failed',
  onPage = 'page',
  onPan = 'pan',
  onPreFullPage = 'pre-full-page',
  onPreFullScreen = 'pre-full-screen',
  onRemoveOverlay = 'remove-overlay',
  onResetSize = 'reset-size',
  onResize = 'resize',
  onRotate = 'rotate',
  onTileDrawing = 'tile-drawing',
  onTileDrawn = 'tile-drawn',
  onTileLoadFailed = 'tile-load-failed',
  onTileLoad = 'tile-loaded',
  onTileUnload = 'tile-unloaded',
  onUpdateLevel = 'update-level',
  onUpdateOverlay = 'update-overlay',
  onUpdateTile = 'update-tile',
  onUpdateViewport = 'update-viewport',
  onViewportChange = 'viewport-change',
  onVisible = 'visible',
  onZoom = 'zoom',
}

export interface CanvasOverlayProps extends NodeProps {
  onRedraw: (
    overlayCanvasEl: HTMLCanvasElement,
    viewer: OpenSeadragon.Viewer
  ) => void
}

export interface TooltipOverlayProps extends NodeProps {
  onRedraw: (event: {
    overlayCanvasEl: HTMLCanvasElement
    viewer: OpenSeadragon.Viewer
    tooltipCoord?: OpenSeadragon.Point
    originalEvent?: MouseEvent
  }) => void
  redrawOnViewportChange?: boolean
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      tiledImage: TiledImageProps
      viewport: ViewportProps
      scalebar: ScalebarProps
      canvasOverlay: CanvasOverlayProps
      tooltipOverlay: TooltipOverlayProps
    }
  }
}
