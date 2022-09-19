import { getMeasurement } from './getMeasurement'
import { getCircleRadiusByCenter } from './getCircleRadius'
import { getCircleStartPoint } from './getCircleStartPoint'

import type { EditMode, Point, Measurement, MeasurementMode } from '../../types'
import type { Image } from '../../Viewer/types'

export function getCurrentMeasurement(
  isEditing: boolean,
  editMode: EditMode | null,
  drawingMode: MeasurementMode,
  currentTextPosition: Point | null,
  mouseDownPoint: Point | null,
  mouseMovePoint: Point,
  prevPoints: [centerPoint: Point, endPoint: Point],
  measurements: Measurement[],
  image: Image | null
) {
  let currentMeasurement = null
  let currentPoints = prevPoints

  if (drawingMode === 'circle' && mouseDownPoint !== null) {
    currentPoints = [mouseDownPoint, mouseMovePoint]
  }

  if (drawingMode === 'circle' && isEditing && editMode) {
    const [currentCenterPoint, currentEndPoint] = prevPoints
    const radius = getCircleRadiusByCenter(currentCenterPoint, currentEndPoint)
    const currentStartPoint = getCircleStartPoint(currentCenterPoint, radius)

    currentPoints = [currentStartPoint, currentEndPoint]
  }

  currentMeasurement = getMeasurement(currentPoints, currentTextPosition, drawingMode, measurements, image)

  return currentMeasurement
}
