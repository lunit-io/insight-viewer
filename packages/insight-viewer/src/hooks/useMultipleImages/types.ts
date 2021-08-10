import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { HTTP, LoaderType, LoadingState } from '../../types'

export interface Loaded {
  image: CornerstoneImage
  loaded: number
}

export interface ImagesLoadState {
  loadingStates: LoadingState[]
  images: CornerstoneImage[]
}

export type Props = {
  imageIds: string[]
  type?: LoaderType
} & Partial<HTTP>
