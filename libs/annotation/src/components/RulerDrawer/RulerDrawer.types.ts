import type { EditMode, DrawableRulerAnnotation } from '../../types'

export interface RulerDrawerProps {
  isSelectedMode: boolean
  annotation: DrawableRulerAnnotation
  setAnnotationEditMode: (targetPoint: EditMode) => void
}
