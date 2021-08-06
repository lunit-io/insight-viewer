import { CornerstoneImage } from '../../utils/cornerstoneHelper'
import { LoadingState } from '../../types'

export interface Loaded {
  image: CornerstoneImage
  loaded: number
}

export interface ImagesLoadState {
  loadingStates: LoadingState[]
  images: CornerstoneImage[]
}
