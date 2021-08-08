import OpenSeadragon from 'openseadragon'
import Base from './Base'

interface ViewportProps {
  zoom: number
  rotation: number
}

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
