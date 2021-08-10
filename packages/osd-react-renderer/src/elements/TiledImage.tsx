import OpenSeadragon from 'openseadragon'
import { TiledImageProps } from '../types'
import Base from './Base'

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
