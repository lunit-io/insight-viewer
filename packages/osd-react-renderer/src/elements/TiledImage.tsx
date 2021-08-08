import OpenSeadragon from 'openseadragon'
import Base from './Base'

interface TiledImageProps {
  url: string
}

class TiledImage extends Base {
  url: string

  set parent(p: Base | null) {
    this._parent = p
    this._parent?.viewer.open(this.url)
  }

  constructor(viewer: OpenSeadragon.Viewer, props: TiledImageProps) {
    super(viewer)
    this.url = props.url
  }
}
export default TiledImage
