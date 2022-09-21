import { HTTP, Loader } from '../../types'
import { ImageWithoutKey } from '../../Viewer/types'

export type Props = {
  imageId: string
} & Partial<HTTP>

export type GetImage = (arg: { imageId: string; loader: Loader | undefined }) => Promise<ImageWithoutKey>
