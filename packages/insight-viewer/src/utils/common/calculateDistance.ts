/* eslint-disable no-restricted-properties */
import { Image } from '../../Viewer/types'
import { IMAGER_PIXEL_SPACING } from './const'

const calcRadius = (radius: number, spacing: number) => Math.sqrt(Math.pow(radius, 2) / Math.pow(spacing, 2))

export function calculateDistance(radius: number, image: Image | null): number | null {
  if (!image) {
    return radius
  }

  if (image.columnPixelSpacing && image.columnPixelSpacing) {
    return calcRadius(radius, image.columnPixelSpacing)
  }

  const imagerPixelSpacing = image.data.string(IMAGER_PIXEL_SPACING) as string | undefined

  if (!imagerPixelSpacing) {
    return radius
  }

  if (imagerPixelSpacing.length !== 0) {
    const [columnPixelSpacing] = imagerPixelSpacing.split('\\').map(Number)

    return calcRadius(radius, columnPixelSpacing)
  }

  return radius
}
