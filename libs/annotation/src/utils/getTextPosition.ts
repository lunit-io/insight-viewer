import { getEditingTextPosition } from './getEditingTextPosition'

import type { AreaAnnotation, RulerAnnotation, Point, EditMode } from '../types'

export function getTextPosition(
  annotation: AreaAnnotation | RulerAnnotation | null,
  editMode?: EditMode | null,
  currentPoint?: Point
): Point | null {
  if (editMode === 'textMove' && currentPoint) {
    return getEditingTextPosition(currentPoint)
  }

  return annotation == null ? null : annotation.textPoint
}
