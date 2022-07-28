import { DataSet } from 'dicom-parser'
import { Image } from '../../Viewer/types'
import { HTTP, LoaderType, LoadingState } from '../../types'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'

export interface Loaded {
  image: CornerstoneImage & { data: DataSet }
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
