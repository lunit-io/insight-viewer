import { IMAGER_PIXEL_SPACING } from './const'

import type { Point } from '../../types'
import type { Image } from '../../Viewer/types'

function calculateRadius(startPoint: Point, endPoint: Point, col?: number, row?: number): number {
  const [x1, y1] = startPoint
  const [x2, y2] = endPoint

  const [distanceX, distanceY] = col && row ? [(x2 - x1) * col, (y2 - y1) * row] : [x2 - x1, y2 - y1]

  const radius = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))

  return radius
}

export function getCircleRadius(startPoint: Point, endPoint: Point): number {
  const circleRadius = calculateRadius(startPoint, endPoint) / 2

  return circleRadius
}

export function getCircleRadiusByCenter(centerPoint: Point, endPoint: Point): number {
  const circleRadiusByCenter = calculateRadius(centerPoint, endPoint)

  return circleRadiusByCenter
}

/** radius is measured value of circle */
export function getCircleRadiusByMeasuringUnit(
  startPoint: Point,
  endPoint: Point,
  currentImage: Image | null
): { radius: number; unit: 'px' | 'mm' } {
  if (!currentImage) {
    return { radius: calculateRadius(startPoint, endPoint, 1, 1), unit: 'px' }
  }

  if (currentImage.columnPixelSpacing && currentImage.rowPixelSpacing) {
    const { columnPixelSpacing, rowPixelSpacing } = currentImage

    return { radius: calculateRadius(startPoint, endPoint, columnPixelSpacing, rowPixelSpacing), unit: 'mm' }
  }

  const imagerPixelSpacing = currentImage.data.string(IMAGER_PIXEL_SPACING) as string | undefined

  if (!imagerPixelSpacing) {
    return { radius: calculateRadius(startPoint, endPoint, 1, 1), unit: 'px' }
  }

  if (imagerPixelSpacing.length !== 0) {
    const [columnPixelSpacing, rowPixelSpacing] = imagerPixelSpacing.split('\\').map(Number)

    return { radius: calculateRadius(startPoint, endPoint, columnPixelSpacing, rowPixelSpacing), unit: 'mm' }
  }

  return { radius: calculateRadius(startPoint, endPoint, 1, 1), unit: 'px' }
}
