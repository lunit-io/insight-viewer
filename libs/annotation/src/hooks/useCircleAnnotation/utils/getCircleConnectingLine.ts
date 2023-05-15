import { getCircleRadiusByCenter } from '../../../utils/getCircleRadius'

import type { Point } from '../../../types'

export function getCircleConnectingLine(points: [Point, Point], textPoint: Point): [Point, Point] {
  const startPoint = points[0]
  const endPoint = points[1]

  const radius = getCircleRadiusByCenter(startPoint, endPoint)

  if (startPoint[0] < textPoint[0]) {
    if (startPoint[1] < textPoint[1]) {
      const startX = Math.sin((135 * Math.PI) / 180) * radius + startPoint[0]
      const startY = -Math.cos((135 * Math.PI) / 180) * radius + startPoint[1]

      return [[startX, startY], textPoint]
    }

    const startX = Math.sin((45 * Math.PI) / 180) * radius + startPoint[0]
    const startY = -Math.cos((45 * Math.PI) / 180) * radius + startPoint[1]

    return [[startX, startY], textPoint]
  }

  if (startPoint[1] > textPoint[1]) {
    const startX = Math.sin((-45 * Math.PI) / 180) * radius + startPoint[0]
    const startY = -Math.cos((-45 * Math.PI) / 180) * radius + startPoint[1]

    return [[startX, startY], textPoint]
  }

  const startX = Math.sin((225 * Math.PI) / 180) * radius + startPoint[0]
  const startY = -Math.cos((225 * Math.PI) / 180) * radius + startPoint[1]

  return [[startX, startY], textPoint]
}
