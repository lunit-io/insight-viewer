import { calculateDistance } from './calculateDistance'

import { Point } from '../../../types'
import { Image } from '../../../Viewer/types'

export function getCircleCenterAndEndPoint(center: Point, radius: number, image: Image | null): [Point, Point] {
  const calculatedDistance = calculateDistance(radius, image)
  const endPoint: Point = [center[0] + (calculatedDistance ?? 0), center[1]]

  return [center, endPoint]
}
