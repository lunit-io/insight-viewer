import { getDrawingTextPosition } from './getDrawingTextPosition'
import { getEditingTextPosition } from './getEditingTextPosition'

import { Point, EditMode, MeasurementMode } from '../../types'

export function getTextPosition(
  mode: MeasurementMode,
  points: [Point, Point],
  editMode?: EditMode | null,
  currentPoint?: Point
): Point {
  if (editMode === 'textMove' && currentPoint) {
    return getEditingTextPosition(currentPoint)
  }

  return getDrawingTextPosition(points, mode)
}
