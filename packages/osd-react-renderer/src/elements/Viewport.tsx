import OpenSeadragon from 'openseadragon'
import Base from './Base'
import {
  ViewerEventHandlers,
  ViewportEventHandlers,
  ViewportProps,
} from '../types'
import { hasOwnProperty } from '../utils/object'

class Viewport extends Base implements ViewportProps {
  zoom: ViewportProps['zoom']

  rotation: ViewportProps['rotation']

  eventHandlers: ViewportEventHandlers

  constructor(viewer: OpenSeadragon.Viewer, props: ViewportProps) {
    super(viewer)

    this.zoom = props.zoom
    this.rotation = props.rotation
    this.eventHandlers = Object.keys(props).reduce<ViewportEventHandlers>(
      (handlers, key) => {
        if (hasOwnProperty(ViewerEventHandlers, key)) {
          handlers[key] = props[key]
        }
        return handlers
      },
      {}
    )
    // this.eventHandlers = Object.keys(props).reduce(
    //   (handlers, key) =>
    //     key !== 'zoom' && key !== 'rotation'
    //       ? {
    //           ...handlers,
    //           [key]: props[key as keyof ViewportProps],
    //         }
    //       : handlers,
    //   {}
    // )
  }

  set parent(p: Base | null) {
    this._parent = p
    const checkEventHandler = p ? 'addHandler' : 'removeHandler'
    Object.keys(this.eventHandlers).forEach(key => {
      if (!hasOwnProperty(ViewerEventHandlers, key)) {
        return
      }
      const handler = this.eventHandlers[key]
      if (handler) {
        this._parent?.viewer[checkEventHandler](
          ViewerEventHandlers[key],
          handler
        )
      }
    })
  }
}

export default Viewport
