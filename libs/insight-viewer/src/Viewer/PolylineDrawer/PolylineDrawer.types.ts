import type {
  EditMode,
  PolygonAnnotation,
  FreeLineAnnotation,
  LineAnnotation,
  ArrowLineAnnotation,
  CursorStatus,
} from '../../types'

export interface PolylineDrawerProps {
  annotation: PolygonAnnotation | FreeLineAnnotation | LineAnnotation | ArrowLineAnnotation
  isSelectedMode: boolean
  showAnnotationLabel: boolean
  selectedAnnotationLabel: string | number | null
  setAnnotationEditMode: (mode: EditMode) => void
  isPolygonSelected: boolean
  cursorStatus: CursorStatus
}
