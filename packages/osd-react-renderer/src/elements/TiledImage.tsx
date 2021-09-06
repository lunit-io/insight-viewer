import OpenSeadragon from 'openseadragon'
import { TiledImageProps } from '../types'
import Base from './Base'

class TiledImage extends Base {
  props: TiledImageProps

  set parent(p: Base | null) {
    this._parent = p
    this._openImage()
  }

  constructor(viewer: OpenSeadragon.Viewer, props: TiledImageProps) {
    super(viewer)
    this.props = props
  }

  commitUpdate(props: TiledImageProps): void {
    this.props = props
    this._openImage()
  }

  private _openImage(): void {
    const viewer = this._parent?.viewer
    if (!viewer) return
    viewer.close()
    if (!this.props.tileIndex && !this.props.dziMeta) {
      // Real-time tiling
      viewer.open(this.props.url)
    } else if (this.props.tileIndex && this.props.dziMeta) {
      // Static(Glob) tiling
      // https://github.com/openseadragon/openseadragon/issues/1032#issuecomment-248323573
      // https://github.com/openseadragon/openseadragon/blob/master/test/modules/ajax-tiles.js
      const customTileSource = {
        ...this.props.dziMeta,
        getTileUrl: () => this.props.url,
        getTileAjaxHeader: (level: number, x: number, y: number) => ({
          Range:
            this.props.tileIndex && this.props.tileIndex[`${level} ${x} ${y}`],
        }),
      }
      viewer.open(customTileSource)
    } else {
      throw new Error(
        'Both tileIndex and tileMeta should be defined or not defined at the same time'
      )
    }
  }
}
export default TiledImage
