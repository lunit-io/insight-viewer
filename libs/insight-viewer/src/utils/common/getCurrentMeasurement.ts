import { getMeasurement } from './getMeasurement'
import { getCircleRadiusByCenter } from './getCircleRadius'

import type { EditMode, Point, Measurement, MeasurementMode } from '../../types'
import type { Image } from '../../Viewer/types'

export function getCurrentMeasurement(
  isEditing: boolean,
  editMode: EditMode | null,
  drawingMode: MeasurementMode,
  currentTextPosition: Point | null,
  mouseDownPoint: Point | null,
  mouseMovePoint: Point,
  currentPoints: [centerPoint: Point, endPoint: Point],
  measurements: Measurement[],
  image: Image | null
) {
  let currentMeasurement = null
  if (drawingMode === 'circle') {
    if (mouseDownPoint !== null) {
      currentMeasurement = getMeasurement(
        [mouseDownPoint, mouseMovePoint],
        currentTextPosition,
        drawingMode,
        measurements,
        image
      )
    }
    if (isEditing && editMode) {
      const [currentCenterPoint, currentEndPoint] = currentPoints
      const radius = getCircleRadiusByCenter(currentCenterPoint, currentEndPoint)
      const currentStartPoint: Point = [currentCenterPoint[0] - radius, currentCenterPoint[1]]

      currentMeasurement = getMeasurement(
        [currentStartPoint, currentEndPoint],
        currentTextPosition,
        drawingMode,
        measurements,
        image
      )
    }
  } else {
    currentMeasurement = getMeasurement(currentPoints, currentTextPosition, drawingMode, measurements, image)
  }

  return currentMeasurement
}
