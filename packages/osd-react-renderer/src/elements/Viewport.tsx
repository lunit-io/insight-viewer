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
    this.eventHandlers = Viewport.extractEventHandlers(props)
  }

  commitUpdate(props: ViewportProps): void {
    this.updateEventHandler('remove') // removeHandler
    this.zoom = props.zoom
    this.rotation = props.rotation
    this.eventHandlers = Viewport.extractEventHandlers(props)
    this.updateEventHandler('add')
  }

  private static extractEventHandlers(props: ViewportProps) {
    return Object.keys(props).reduce<ViewportEventHandlers>((handlers, key) => {
      if (hasOwnProperty(ViewerEventHandlers, key)) {
        handlers[key] = props[key]
      }
      return handlers
    }, {})
  }

  private updateEventHandler(update: 'add' | 'remove') {
    const parent = this._parent
    if (!parent) {
      return
    }
    const checkEventHandler = update == 'add' ? 'addHandler' : 'removeHandler'
    Object.keys(this.eventHandlers).forEach(key => {
      if (!hasOwnProperty(ViewerEventHandlers, key)) {
        return
      }
      const handler = this.eventHandlers[key]
      if (handler) {
        parent.viewer[checkEventHandler](ViewerEventHandlers[key], handler)
      }
    })
  }

  set parent(p: Base | null) {
    this._parent = p
    this.updateEventHandler('add')
  }
}

export default Viewport
