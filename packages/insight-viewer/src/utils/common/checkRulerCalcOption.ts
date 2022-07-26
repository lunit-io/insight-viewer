import { Image } from '../../Viewer/types'
import { IMAGER_PIXEL_SPACING } from './const'

const checkRulerCalcOption = (
  image: Image | null
): { unit: 'px' | 'mm'; kind: null | 'pixelSpacing' | 'imagerPixelSpacing' } => {
  if (!image) {
    return { unit: 'px', kind: null }
  }

  if (image.columnPixelSpacing && image.rowPixelSpacing) {
    return { unit: 'mm', kind: 'pixelSpacing' }
  }

  const imagerPixelSpacing = image.data.elements[IMAGER_PIXEL_SPACING] as unknown as [number, number] | undefined

  if (imagerPixelSpacing) {
    return { unit: 'mm', kind: 'imagerPixelSpacing' }
  }

  return { unit: 'px', kind: null }
}

export default checkRulerCalcOption
