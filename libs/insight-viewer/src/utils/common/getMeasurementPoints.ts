import { getMeasurementDrawingPoints } from './getMeasurementDrawingPoints'
import { getMeasurementEditingPoints } from './getMeasurementEditingPoints'

import type { Point, Measurement, EditMode, MeasurementMode } from '../../types'
import { EditPoints } from './getEditPointPosition'

interface MeasurementPointInfo {
  mode: MeasurementMode
  mouseDownPoint: Point
  mouseMovePoint: Point
  editPointsOnSelected: EditPoints | null
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
  editPointsOnSelected,
  editMode,
  isEditing,
  prevPoints,
  editStartPoint,
  selectedMeasurement,
}: MeasurementPointInfo) {
  if (isEditing && selectedMeasurement && editStartPoint && editMode && editPointsOnSelected) {
    return getMeasurementEditingPoints(
      prevPoints,
      mouseMovePoint,
      editPointsOnSelected,
      editStartPoint,
      editMode,
      selectedMeasurement.type
    )
  }

  return getMeasurementDrawingPoints(prevPoints, mouseDownPoint, mouseMovePoint, mode)
}
