import { IMAGER_PIXEL_SPACING } from './const'

import type { Point } from '../../types'
import type { Image } from '../../Viewer/types'

/**
 * The ImageSpacing uses cornerstone image's columnPixelSpacing, rowPixelSpacing
 * If there is no image or cornerstone's pixel spacing does not exist,
 * radius is calculated without spacing value
 */

interface ImageSpacing {
  columnPixelSpacing: number
  rowPixelSpacing: number
}

function calculateRadius(startPoint: Point, endPoint: Point, imageSpacing?: ImageSpacing): number {
  const [x1, y1] = startPoint
  const [x2, y2] = endPoint

  let distanceX = x2 - x1
  let distanceY = y2 - y1

  if (imageSpacing) {
    distanceX = (x2 - x1) * imageSpacing.columnPixelSpacing
    distanceY = (y2 - y1) * imageSpacing.rowPixelSpacing
  }

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
    return { radius: calculateRadius(startPoint, endPoint), unit: 'px' }
  }

  if (currentImage.columnPixelSpacing && currentImage.rowPixelSpacing) {
    const { columnPixelSpacing, rowPixelSpacing } = currentImage

    return { radius: calculateRadius(startPoint, endPoint, { columnPixelSpacing, rowPixelSpacing }), unit: 'mm' }
  }

  const imagerPixelSpacing = currentImage.data.string(IMAGER_PIXEL_SPACING) as string | undefined

  if (!imagerPixelSpacing) {
    return { radius: calculateRadius(startPoint, endPoint), unit: 'px' }
  }

  if (imagerPixelSpacing.length !== 0) {
    const [columnPixelSpacing, rowPixelSpacing] = imagerPixelSpacing.split('\\').map(Number)

    return { radius: calculateRadius(startPoint, endPoint, { columnPixelSpacing, rowPixelSpacing }), unit: 'mm' }
  }

  return { radius: calculateRadius(startPoint, endPoint), unit: 'px' }
}
