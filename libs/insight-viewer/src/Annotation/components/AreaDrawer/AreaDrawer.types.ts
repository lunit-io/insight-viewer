import type { DrawableAreaAnnotation, EditMode } from '../../types'

export interface AreaDrawerProps {
  isSelectedMode: boolean
  annotation: DrawableAreaAnnotation
  setAnnotationEditMode: (targetPoint: EditMode) => void
}
