import { getMeasurementDrawingPoints } from './getMeasurementDrawingPoints'
import { getMeasurementEditingPoints } from './getMeasurementEditingPoints'

import type { Point, Measurement, EditMode, MeasurementMode } from '../../types'

interface MeasurementPointInfo {
  mode: MeasurementMode
  mouseDownPoint: Point
  mouseMovePoint: Point
  editMode: EditMode | null
  isEditing: boolean
  prevPoints: [Point, Point]
  editStartPoint: Point | null
  selectedMeasurement: Measurement | null
}

export function getMeasurementPoints({
  mode,
  mouseDownPoint,
  mouseMovePoint,
  editMode,
  isEditing,
  prevPoints,
  editStartPoint,
  selectedMeasurement,
}: MeasurementPointInfo) {
  if (isEditing && selectedMeasurement && editStartPoint && editMode) {
    return getMeasurementEditingPoints(prevPoints, mouseMovePoint, editStartPoint, editMode, selectedMeasurement.type)
  }

  return getMeasurementDrawingPoints(prevPoints, mouseDownPoint, mouseMovePoint, mode)
}
