import { Point, EditMode, Measurement } from 'types'
import { getEditingTextPosition } from './getEditingTextPosition'

export function getTextPosition(
  measurement: Measurement | null,
  editMode?: EditMode | null,
  currentPoint?: Point
): Point | null {
  if (editMode === 'textMove' && currentPoint) {
    return getEditingTextPosition(currentPoint)
  }

  return measurement == null ? null : measurement.textPoint
}
