import type { EditMode, DrawableTextAnnotation } from '../../types'

export interface TextDrawerProps {
  annotation: DrawableTextAnnotation
  setAnnotationEditMode: (mode: EditMode) => void
}
