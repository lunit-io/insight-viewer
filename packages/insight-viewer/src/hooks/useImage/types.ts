import { HTTP, RequestInterceptor, ImageLoaderScheme } from '../../types'
import { ImageWithoutKey } from '../../Viewer/types'

export type Props = {
  imageId: string
} & Partial<HTTP>

export type GetImage = (arg: {
  imageId: string
  imageScheme: ImageLoaderScheme
  requestInterceptor: RequestInterceptor
}) => Promise<ImageWithoutKey>
