import { Image, ImageWithoutKey } from '../../Viewer/types'
import { HTTP, LoaderType, LoadingState } from '../../types'

export interface Loaded {
  image: ImageWithoutKey
  loaded: number
}

export interface ImagesLoadState {
  loadingStates: LoadingState[]
  images: Image[]
}

export type Props = {
  imageIds: string[]
  type?: LoaderType
} & Partial<HTTP>

export interface OnImagesLoaded {
  (): void
}
