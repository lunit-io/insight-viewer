import { getCircleRadiusByCenter } from './getCircleRadius'
import { getCircleStartPoint } from './getCircleStartPoint'

import type { EditMode, Point, MeasurementMode } from '../../types'
import type { EditPoints } from './getEditPointPosition'
import { getCircleCenterPoint } from './getCircleCenterPoint'
import { getCircleEndPoint } from './getCircleEndPoint'

export function getMeasurementPointsByMode(
  isEditing: boolean,
  editMode: EditMode | null,
  drawingMode: MeasurementMode,
  mouseDownPoint: Point | null,
  mouseMovePoint: Point,
  editTargetPoints: EditPoints | null,
  prevPoints: [centerPoint: Point, endPoint: Point]
): [Point, Point] {
  let currentPoints = prevPoints // 이것 때문에 처음에 살짝 뜰 수 있으므로 주의

  if (drawingMode === 'circle' && isEditing && editMode && editTargetPoints) {
    const radius = getCircleRadiusByCenter(prevPoints[0], prevPoints[1])
    const startPoint = getCircleStartPoint(prevPoints[0], radius)

    currentPoints = [startPoint, prevPoints[1]]
  }

  return currentPoints
}
