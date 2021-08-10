import OpenSeadragon from 'openseadragon'
import { ViewerEventHandlers, ViewportProps } from '../types'
import Base from './Base'

class Viewport extends Base {
  zoom: number

  rotation: number

  eventHandlers: Partial<
    Record<
      keyof typeof ViewerEventHandlers,
      OpenSeadragon.EventHandler<OpenSeadragon.ViewerEvent>
    >
  > = {}

  set parent(p: Base | null) {
    this._parent = p
    if (this._parent) {
      Object.keys(this.eventHandlers).forEach(key => {
        const handlerKey = key as keyof typeof ViewerEventHandlers
        const handler = this.eventHandlers[handlerKey]
        if (handler) {
          this._parent?.viewer.addHandler(
            ViewerEventHandlers[handlerKey],
            handler
          )
        }
      })
    } else {
      Object.keys(this.eventHandlers).forEach(key => {
        const handlerKey = key as keyof typeof ViewerEventHandlers
        const handler = this.eventHandlers[handlerKey]
        if (handler) {
          this._parent?.viewer.removeHandler(
            ViewerEventHandlers[handlerKey],
            handler
          )
        }
      })
    }
  }

  constructor(viewer: OpenSeadragon.Viewer, props: ViewportProps) {
    super(viewer)

    this.zoom = props.zoom
    this.rotation = props.rotation
    this.eventHandlers = Object.keys(props).reduce(
      (handlers, key) =>
        key !== 'zoom' && key !== 'rotation'
          ? {
              ...handlers,
              [key]: props[key as keyof ViewportProps],
            }
          : handlers,
      {}
    )
  }
}

export default Viewport
