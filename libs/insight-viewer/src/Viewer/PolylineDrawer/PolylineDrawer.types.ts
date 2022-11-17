import type {
  LineHeadMode,
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
  /** @deprecated use arrow line instead */
  lineHead: LineHeadMode
  showAnnotationLabel: boolean
  selectedAnnotationLabel: string | number | null
  setAnnotationEditMode: (mode: EditMode) => void
  isPolygonSelected: boolean
  cursorStatus: CursorStatus
}
