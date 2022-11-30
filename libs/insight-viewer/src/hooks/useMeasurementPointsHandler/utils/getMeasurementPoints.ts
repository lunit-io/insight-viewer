import { getMeasurementDrawingPoints } from './getMeasurementDrawingPoints'
import { getMeasurementEditingPoints } from './getMeasurementEditingPoints'

import type { Point, Measurement, EditMode, MeasurementMode } from '../../../types'

interface MeasurementPointInfo {
  point: Point
  isEditing: boolean
  mode: MeasurementMode
  editMode: EditMode | null
  prevPoints: [Point, Point]
  editStartPoint: Point | null
  selectedMeasurement: Measurement | null
}

export function getMeasurementPoints({
  mode,
  point,
  editMode,
  isEditing,
  prevPoints,
  editStartPoint,
  selectedMeasurement,
}: MeasurementPointInfo) {
  if (isEditing && selectedMeasurement && editStartPoint && editMode) {
    return getMeasurementEditingPoints(prevPoints, point, editStartPoint, editMode, selectedMeasurement.type)
  }

  return getMeasurementDrawingPoints(prevPoints, point, mode)
}
