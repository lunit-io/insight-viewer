import { Image } from '../../Viewer/types'
import { HTTP, LoaderType, LoadingState } from '../../types'

export interface Loaded {
  image: Image
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
