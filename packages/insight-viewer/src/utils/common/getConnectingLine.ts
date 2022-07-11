import { Point, MeasurementMode } from '../../types'

import { getRulerConnectingLine } from './getRulerConnectingLine'
import { getCircleConnectingLine } from './getCircleConnectingLine'

export function getConnectingLine(points: [Point, Point], textPoint: Point, mode: MeasurementMode): [Point, Point] {
  if (mode === 'ruler') {
    return getRulerConnectingLine(points, textPoint)
  }

  return getCircleConnectingLine(points, textPoint)
}
