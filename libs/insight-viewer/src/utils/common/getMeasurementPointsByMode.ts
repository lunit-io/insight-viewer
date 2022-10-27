import { getCircleRadiusByCenter } from './getCircleRadius'
import { getCircleStartPoint } from './getCircleStartPoint'

import type { EditMode, Point, MeasurementMode } from '../../types'

export function getMeasurementPointsByMode(
  isEditing: boolean,
  editMode: EditMode | null,
  drawingMode: MeasurementMode,
  mouseDownPoint: Point | null,
  mouseMovePoint: Point,
  prevPoints: [centerPoint: Point, endPoint: Point]
): [Point, Point] {
  let currentPoints = prevPoints
  if (drawingMode === 'circle' && mouseDownPoint !== null) {
    currentPoints = [mouseDownPoint, mouseMovePoint]
  }

  // if (drawingMode === 'circle' && isEditing && editMode) {
  //   const [currentCenterPoint, currentEndPoint] = prevPoints
  //   const radius = getCircleRadiusByCenter(currentCenterPoint, currentEndPoint)
  //   const currentStartPoint = getCircleStartPoint(currentCenterPoint, radius)

  //   currentPoints = [currentStartPoint, currentEndPoint]
  // }

  return currentPoints
}
