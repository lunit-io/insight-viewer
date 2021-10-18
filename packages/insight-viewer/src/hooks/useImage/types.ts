import { HTTP, RequestInterceptor, ImageLoaderScheme } from '../../types'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'

export type Props = {
  imageId: string
} & Partial<HTTP>

export type GetImage = (arg: {
  imageId: string
  imageScheme: ImageLoaderScheme
  requestInterceptor: RequestInterceptor
}) => Promise<CornerstoneImage>
