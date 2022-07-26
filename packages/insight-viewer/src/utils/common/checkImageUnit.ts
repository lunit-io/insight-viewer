import { Image } from '../../Viewer/types'
import { IMAGER_PIXEL_SPACING } from './const'

const checkImageUnit = (image: Image | null): 'px' | 'mm' => {
  if (!image) {
    return 'px'
  }

  if (image.columnPixelSpacing && image.rowPixelSpacing) {
    return 'mm'
  }

  if (!image.data.elements[IMAGER_PIXEL_SPACING]) {
    return 'px'
  }

  return 'mm'
}

export default checkImageUnit
