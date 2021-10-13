import { HTTP, RequestInterceptor } from '../../types'
import { CornerstoneImage } from '../../utils/cornerstoneHelper'

export type Props = {
  imageId: string
} & Partial<HTTP>

export type GetImage = (arg: {
  imageId: string
  requestInterceptor: RequestInterceptor
}) => Promise<CornerstoneImage>
