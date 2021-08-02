import { LOADER_TYPE } from '../../const'
import { HTTP, RequestInterceptor } from '../../types'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'

export type ImageLoad = {
  imageId: string
} & Partial<HTTP>

export type LoaderType = typeof LOADER_TYPE[keyof typeof LOADER_TYPE]

export type DefaultGetImage = (arg: {
  imageId: string
  requestInterceptor: RequestInterceptor
}) => Promise<CornerstoneImage>

export type GetImage = DefaultGetImage | (() => Promise<CornerstoneImage>)
