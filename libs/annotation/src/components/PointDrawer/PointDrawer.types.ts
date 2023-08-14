import type { EditMode, DrawablePointAnnotation } from '../../types'

export interface PointDrawerProps {
  annotation: DrawablePointAnnotation
  isSelectedMode: boolean
  showAnnotationLabel: boolean
  selectedAnnotationLabel: string | number | null
  setAnnotationEditMode: (mode: EditMode) => void
}
