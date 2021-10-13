import { IMAGE_TYPE } from '../../const'
import { ImageType } from '../../types'

export function getImageId(image: ImageType): string | undefined {
  return (
    image[IMAGE_TYPE.WADOURI] ||
    image[IMAGE_TYPE.DICOMFILE] ||
    image[IMAGE_TYPE.WEB]
  )
}
