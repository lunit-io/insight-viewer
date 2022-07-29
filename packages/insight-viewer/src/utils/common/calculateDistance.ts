/* eslint-disable no-restricted-properties */
import { Image } from '../../Viewer/types'
import { IMAGER_PIXEL_SPACING } from './const'

export function calculateDistance(radius: number, image: Image | null): number | null {
  if (!image) {
    return radius
  }

  if (image.columnPixelSpacing && image.columnPixelSpacing) {
    return Math.sqrt(Math.pow(radius, 2) / Math.pow(image.columnPixelSpacing, 2))
  }

  const imagerPixelSpacing = image.data.string(IMAGER_PIXEL_SPACING)

  if (imagerPixelSpacing.length !== 0) {
    const [columnPixelSpacing] = imagerPixelSpacing.split('\\').map(Number)

    return Math.sqrt(Math.pow(radius, 2) / Math.pow(columnPixelSpacing, 2))
  }

  return radius
}
