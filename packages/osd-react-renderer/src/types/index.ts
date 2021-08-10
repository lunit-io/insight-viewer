/* eslint-disable @typescript-eslint/no-namespace, no-shadow */
import OpenSeadragon from 'openseadragon'

export interface OSDViewerProps {
  options: OpenSeadragon.Options
}

export interface TiledImageProps {
  url: string
}

export interface ViewportProps
  extends Partial<
    Record<
      keyof typeof ViewerEventHandlers,
      OpenSeadragon.EventHandler<OpenSeadragon.ViewerEvent>
    >
  > {
  zoom: number
  rotation: number
}

enum ViewerEventHandlers {
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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      tiledImage: TiledImageProps
      viewport: ViewportProps
    }
  }
}
