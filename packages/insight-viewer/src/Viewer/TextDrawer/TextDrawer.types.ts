import { EditMode, TextAnnotation } from '../../types'

export interface TextDrawerProps {
  annotation: TextAnnotation
  isSelectedMode: boolean
  setAnnotationEditMode: (mode: EditMode) => void
  label?: string
}
