/* eslint-disable no-restricted-properties */
import { Point } from '../../types'
import { Image } from '../../Viewer/types'
import { calculateLengthBetweenPoints } from './calculateLengthBetweenPoints'
import { IMAGER_PIXEL_SPACING } from './const'

export function getLineLength(
  startPoint: Point,
  endPoint: Point,
  currentImage: Image | null
): { length: number; unit: 'px' | 'mm' } {
  if (!currentImage) {
    return { length: calculateLengthBetweenPoints(startPoint, endPoint, 1, 1), unit: 'px' }
  }

  if (currentImage.columnPixelSpacing && currentImage.rowPixelSpacing) {
    const { columnPixelSpacing, rowPixelSpacing } = currentImage

    return {
      length: calculateLengthBetweenPoints(startPoint, endPoint, columnPixelSpacing, rowPixelSpacing),
      unit: 'mm',
    }
  }

  const imagerPixelSpacing = currentImage.data.string(IMAGER_PIXEL_SPACING) as string | undefined

  if (!imagerPixelSpacing) {
    return { length: calculateLengthBetweenPoints(startPoint, endPoint, 1, 1), unit: 'px' }
  }

  if (imagerPixelSpacing.length !== 0) {
    const [columnPixelSpacing, rowPixelSpacing] = imagerPixelSpacing.split('\\').map(Number)

    return {
      length: calculateLengthBetweenPoints(startPoint, endPoint, columnPixelSpacing, rowPixelSpacing),
      unit: 'mm',
    }
  }

  return { length: calculateLengthBetweenPoints(startPoint, endPoint, 1, 1), unit: 'px' }
}
