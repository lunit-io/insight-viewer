import { IMAGER_PIXEL_SPACING } from '../const'

import type { Image } from '@lunit/insight-viewer'
import type { Point } from '../types'

/**
 * Radius should be divided by 2 if the first argument is a startPoint, not a centerPoint
 */
function calculateRadius(
  isStartedFromCenter: boolean,
  startPoint: Point,
  endPoint: Point,
  scaleRatio?: [scaleX: number, scaleY: number]
): number {
  const [x1, y1] = startPoint
  const [x2, y2] = endPoint

  let distanceX = x2 - x1
  let distanceY = y2 - y1

  if (scaleRatio) {
    distanceX = (x2 - x1) * scaleRatio[0]
    distanceY = (y2 - y1) * scaleRatio[1]
  }

  const radius = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
  const radiusByStartPointing = isStartedFromCenter ? radius : radius / 2

  return radiusByStartPointing
}

export function getCircleRadius(startPoint: Point, endPoint: Point): number {
  const circleRadius = calculateRadius(false, startPoint, endPoint)

  return circleRadius
}

export function getCircleRadiusByCenter(centerPoint: Point, endPoint: Point): number {
  const circleRadiusByCenter = calculateRadius(true, centerPoint, endPoint)

  return circleRadiusByCenter
}

/**
 * The 'getCircleRadiusByMeasuringUnit' function's radius is measured value of circle

 * The ImageSpacing uses cornerstone image's columnPixelSpacing and rowPixelSpacing
 * If there is no image or cornerstone's pixel spacing does not exist,
 * radius is calculated without spacing value
 */
export function getCircleRadiusByMeasuringUnit(
  startPoint: Point,
  endPoint: Point,
  currentImage: Image | null
): { radius: number; unit: 'px' | 'mm' } {
  if (!currentImage) {
    return { radius: calculateRadius(false, startPoint, endPoint), unit: 'px' }
  }

  if (currentImage.columnPixelSpacing && currentImage.rowPixelSpacing) {
    const { columnPixelSpacing, rowPixelSpacing } = currentImage

    return {
      radius: calculateRadius(false, startPoint, endPoint, [columnPixelSpacing, rowPixelSpacing]),
      unit: 'mm',
    }
  }

  const imagerPixelSpacing = currentImage.data.string(IMAGER_PIXEL_SPACING) as string | undefined

  if (!imagerPixelSpacing) {
    return { radius: calculateRadius(false, startPoint, endPoint), unit: 'px' }
  }

  if (imagerPixelSpacing.length !== 0) {
    const [columnPixelSpacing, rowPixelSpacing] = imagerPixelSpacing.split('\\').map(Number)

    return {
      radius: calculateRadius(false, startPoint, endPoint, [columnPixelSpacing, rowPixelSpacing]),
      unit: 'mm',
    }
  }

  return { radius: calculateRadius(false, startPoint, endPoint), unit: 'px' }
}
