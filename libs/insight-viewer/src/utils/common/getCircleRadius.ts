import { IMAGER_PIXEL_SPACING } from './const'

import type { Point } from '../../types'
import type { Image } from '../../Viewer/types'

function getMidPoint(startPoint: Point, endPoint: Point): Point {
  const [x1, y1] = startPoint
  const [x2, y2] = endPoint

  const midX = Math.abs(x2 - x1)
  const midY = Math.abs(y2 - y1)

  return [midX, midY]
}

export function getCircleRadius(mouseDownPoint: Point, mouseUpPoint: Point): number {
  const [midX, midY] = getMidPoint(mouseDownPoint, mouseUpPoint)
  const radius = Math.sqrt(Math.pow(midX, 2) + Math.pow(midY, 2))

  return radius
}

/** radius is measured value of circle */
export function getCircleRadiusByMeasuringUnit(
  mouseDownPoint: Point,
  mouseUpPoint: Point,
  currentImage: Image | null
): { radius: number; unit: 'px' | 'mm' } {
  const [midX, midY] = getMidPoint(mouseDownPoint, mouseUpPoint)

  const calcRadius = (x: number, y: number, col: number, row: number) => {
    const radius = Math.sqrt(Math.pow(x * col, 2) + Math.pow(y * row, 2))

    return radius
  }

  if (!currentImage) {
    return { radius: calcRadius(midX, midY, 1, 1), unit: 'px' }
  }

  if (currentImage.columnPixelSpacing && currentImage.rowPixelSpacing) {
    const { columnPixelSpacing, rowPixelSpacing } = currentImage

    return { radius: calcRadius(midX, midY, columnPixelSpacing, rowPixelSpacing), unit: 'mm' }
  }

  const imagerPixelSpacing = currentImage.data.string(IMAGER_PIXEL_SPACING) as string | undefined

  if (!imagerPixelSpacing) {
    return { radius: calcRadius(midX, midY, 1, 1), unit: 'px' }
  }

  if (imagerPixelSpacing.length !== 0) {
    const [columnPixelSpacing, rowPixelSpacing] = imagerPixelSpacing.split('\\').map(Number)

    return { radius: calcRadius(midX, midY, columnPixelSpacing, rowPixelSpacing), unit: 'mm' }
  }

  return { radius: calcRadius(midX, midY, 1, 1), unit: 'px' }
}
