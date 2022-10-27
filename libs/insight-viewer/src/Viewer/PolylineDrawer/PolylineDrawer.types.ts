import type {
  LineHeadMode,
  EditMode,
  PolygonAnnotation,
  FreeLineAnnotation,
  LineAnnotation,
  CursorStatus,
} from '../../types'

export interface PolylineDrawerProps {
  annotation: PolygonAnnotation | FreeLineAnnotation | LineAnnotation
  isSelectedMode: boolean
  lineHead: LineHeadMode
  showAnnotationLabel: boolean
  selectedAnnotationLabel: string | number | null
  setAnnotationEditMode: (mode: EditMode) => void
  isPolygonSelected: boolean
  cursorStatus: CursorStatus
}
