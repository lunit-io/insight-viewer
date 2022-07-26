import { HTTP, RequestInterceptor, ImageLoaderScheme } from '../../types'
import { Image } from '../../Viewer/types'

export type Props = {
  imageId: string
} & Partial<HTTP>

export type GetImage = (arg: {
  imageId: string
  imageScheme: ImageLoaderScheme
  requestInterceptor: RequestInterceptor
}) => Promise<Image>
