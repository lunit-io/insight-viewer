/* eslint-disable @typescript-eslint/no-namespace */
export type OSDViewerProps = {
  options: OpenSeadragon.Options
}

export type TiledImageProps = {
  url: string
}

export type ViewportProps = {
  zoom: number
  rotation: number
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      tiledImage: TiledImageProps
      viewport: ViewportProps
    }
  }
}
