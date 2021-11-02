import OpenSeadragon from 'openseadragon'
import '../plugins/OpenSeadragonTooltipOverlay'
import { TooltipOverlayProps } from '../types'
import Base from './Base'

declare module 'openseadragon' {
  interface TooltipOverlay extends OpenSeadragon.Overlay {
    forceRedraw(): void
    reset(): void
    canvas(): HTMLCanvasElement
    onRedraw: (e?: MouseEvent) => void
    tooltipLocation?: OpenSeadragon.Point
    redrawOnViewportChange: boolean
  }

  interface TooltipOverlayOptions {
    onRedraw?: (e?: MouseEvent) => void
    redrawOnViewportChange?: boolean
  }

  interface Viewer {
    tooltipOverlay: (options?: TooltipOverlayOptions) => TooltipOverlay
    tooltipOverlayExists: () => boolean
  }
}

const defaultProps: TooltipOverlayProps = {
  onRedraw: () => {},
  redrawOnViewportChange: true,
}

class TooltipOverlay extends Base {
  props: TooltipOverlayProps

  _overlay: OpenSeadragon.TooltipOverlay

  set overlay(o: OpenSeadragon.TooltipOverlay) {
    this._overlay = o
  }

  get overlay(): OpenSeadragon.TooltipOverlay {
    return this._overlay
  }

  set parent(p: Base | null) {
    this._parent = p
    this._setOnRedraw()
  }

  constructor(viewer: OpenSeadragon.Viewer, props: TooltipOverlayProps) {
    super(viewer)
    this.props = { ...defaultProps, ...props }
    this._overlay = this.viewer.tooltipOverlay({
      onRedraw: () => {},
      redrawOnViewportChange: this.props.redrawOnViewportChange,
    })
  }

  commitUpdate(props: TooltipOverlayProps): void {
    const oldRedraw = this.props.onRedraw
    this.props = { ...defaultProps, ...props }
    this._overlay.redrawOnViewportChange =
      this.props.redrawOnViewportChange || true
    if (oldRedraw !== props.onRedraw) {
      this._setOnRedraw()
    }
  }

  private _setOnRedraw(): void {
    const {
      viewer,
      props: { onRedraw },
    } = this
    const canvas = this.overlay.canvas()
    this.overlay.onRedraw = e => {
      onRedraw({
        overlayCanvasEl: canvas,
        viewer,
        tooltipCoord: this.overlay.tooltipLocation,
        originalEvent: e,
      })
    }
    this.overlay.forceRedraw()
  }
}
export default TooltipOverlay
