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

  if (drawingMode === 'circle' && mouseDownPoint !== null) {
    currentPoints = [mouseDownPoint, mouseMovePoint]
  }

  if (drawingMode === 'circle' && isEditing && editMode && editTargetPoints) {
    // const [currentCenterPoint, currentEndPoint] = prevPoints

    // const radius = getCircleRadiusByCenter(currentCenterPoint, currentEndPoint)
    // const currentStartPoint = getCircleStartPoint(currentCenterPoint, radius)
    const prevEditStart: Point = [editTargetPoints[0], editTargetPoints[1]]
    const prevEditEnd: Point = [editTargetPoints[2], editTargetPoints[3]]
    // currentPoints = [currentStartPoint, currentEndPoint]
    if (editMode === 'startPoint') {
      const center = getCircleCenterPoint(mouseMovePoint, prevEditEnd)
      const radius = getCircleRadiusByCenter(center, prevEditEnd)
      const end = getCircleEndPoint(center, radius)
      const start = getCircleStartPoint(center, radius)

      currentPoints = [start, end]
    }

    // currentPoints = [datumPoint, mouseMovePoint]
  }

  return currentPoints
}
