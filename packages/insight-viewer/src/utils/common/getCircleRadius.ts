/* eslint-disable no-restricted-properties */
import { Point } from '../../types'
import { Image } from '../../Viewer/types'

export function getCircleRadius(points: Point[], currentImage: Image | null): number {
  const [x1, y1] = points[0]
  const [x2, y2] = points[1]
  const r = Math.sqrt(
    Math.pow(Math.abs(x2 - x1) * (currentImage?.columnPixelSpacing ?? 1), 2) +
      Math.pow(Math.abs(y2 - y1) * (currentImage?.rowPixelSpacing ?? 1), 2)
  )

  return r
}
