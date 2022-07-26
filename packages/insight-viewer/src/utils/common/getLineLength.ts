/* eslint-disable no-restricted-properties */
import { Point } from '../../types'
import { Image } from '../../Viewer/types'
import { IMAGER_PIXEL_SPACING } from './const'

const calcLength = ([startX, startY]: Point, [endX, endY]: Point, col: number, row: number): number => {
  const xPow = Math.pow(Math.abs(endX - startX) * col, 2)
  const yPow = Math.pow(Math.abs(endY - startY) * row, 2)

  return Number(Math.sqrt(xPow + yPow).toFixed(2))
}

export function getLineLength(
  startPoint: Point,
  endPoint: Point,
  currentImage: Image | null
): { length: number; unit: 'px' | 'mm' } {
  if (!currentImage) {
    return { length: calcLength(startPoint, endPoint, 1, 1), unit: 'px' }
  }

  if (currentImage.columnPixelSpacing && currentImage.rowPixelSpacing) {
    const { columnPixelSpacing, rowPixelSpacing } = currentImage

    return { length: calcLength(startPoint, endPoint, columnPixelSpacing, rowPixelSpacing), unit: 'mm' }
  }

  const imagerPixelSpacing = currentImage.data.string(IMAGER_PIXEL_SPACING)

  if (imagerPixelSpacing) {
    const [columnPixelSpacing, rowPixelSpacing] = imagerPixelSpacing.split('\\').map(Number)

    return { length: calcLength(startPoint, endPoint, columnPixelSpacing, rowPixelSpacing), unit: 'mm' }
  }

  return { length: calcLength(startPoint, endPoint, 1, 1), unit: 'px' }
}
