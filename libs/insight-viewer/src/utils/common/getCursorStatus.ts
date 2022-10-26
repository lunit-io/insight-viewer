import type { Annotation } from './../../types'
import type { EditMode, Measurement, Point } from '../../types'
import type { EditPoints } from '../../utils/common/getEditPointPosition'

export const getCursorStatus = <T extends Measurement | Annotation>({
  drawing,
  selectedDrawing,
  editMode,
  editStartPoint,
  editTargetPoints,
}: {
  drawing: T | null
  selectedDrawing: T | null
  editMode: EditMode | null
  editStartPoint: Point | null
  editTargetPoints: EditPoints | null
}) => {
  if (editMode !== null && (editStartPoint !== null || editTargetPoints !== null)) {
    if (editMode === 'startPoint' || editMode === 'endPoint') {
      return 'editing'
    } else {
      return 'moving'
    }
  }
  if (drawing !== null && selectedDrawing === null) {
    return 'drawing'
  }
  return null
}
