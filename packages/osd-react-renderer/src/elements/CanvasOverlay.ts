import OpenSeadragon from 'openseadragon'
import '../plugins/OpenSeadragonCanvasOverlay'
import { CanvasOverlayProps } from '../types'
import Base from './Base'

declare module 'openseadragon' {
  interface CanvasOverlay extends OpenSeadragon.Overlay {
    forceRedraw(): void
    reset(): void
    canvas(): HTMLCanvasElement
    onRedraw: () => void
  }

  interface Viewer {
    canvasOverlay: (options?: { onRedraw: () => void }) => CanvasOverlay
    canvasOverlayExists: () => boolean
  }
}

const defaultOptions: CanvasOverlayProps = { onRedraw: () => {} }

class CanvasOverlay extends Base {
  props: CanvasOverlayProps

  _overlay: OpenSeadragon.CanvasOverlay

  set overlay(o: OpenSeadragon.CanvasOverlay) {
    this._overlay = o
  }

  get overlay(): OpenSeadragon.CanvasOverlay {
    return this._overlay
  }

  set parent(p: Base | null) {
    this._parent = p
    this._setOnRedraw()
  }

  constructor(viewer: OpenSeadragon.Viewer, props: CanvasOverlayProps) {
    super(viewer)
    this._overlay = this.viewer.canvasOverlay({
      onRedraw: () => {},
    })
    this.props = { ...defaultOptions, ...props }
  }

  commitUpdate(props: CanvasOverlayProps): void {
    const oldRedraw = this.props.onRedraw
    this.props = { ...defaultOptions, ...props }
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
    this.overlay.onRedraw = () => {
      onRedraw(canvas, viewer)
    }
    this.overlay.forceRedraw()
  }
}
export default CanvasOverlay
