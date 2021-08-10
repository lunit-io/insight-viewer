import OpenSeadragon from 'openseadragon'
import { ViewportProps } from '../types'
import Base from './Base'

class Viewport extends Base {
  zoom: number

  rotation: number

  constructor(viewer: OpenSeadragon.Viewer, props: ViewportProps) {
    super(viewer)

    this.zoom = props.zoom
    this.rotation = props.rotation
  }
}

export default Viewport
