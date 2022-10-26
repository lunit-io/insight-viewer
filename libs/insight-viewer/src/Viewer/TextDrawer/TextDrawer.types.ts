import type { CursorStatus, EditMode, TextAnnotation } from '../../types'

export interface TextDrawerProps {
  annotation: TextAnnotation
  isSelectedMode: boolean
  cursorStatus: CursorStatus
  setAnnotationEditMode: (mode: EditMode) => void
}
