import type { AnnotationMode, Annotation, LineHeadMode, EditMode, CursorStatus } from '../../types'
import type { EditPoints } from '../../utils/common/getEditPointPosition'

export interface UseAnnotationPointsHandlerParams {
  isDrawing: boolean
  isEditing: boolean
  mode: AnnotationMode
  /** @deprecated use arrow line instead */
  lineHead: LineHeadMode
  annotations: Annotation[]
  selectedAnnotation: Annotation | null
  hoveredAnnotation: Annotation | null
  svgElement: React.RefObject<SVGSVGElement> | null
  addAnnotation: (annotation: Annotation) => void
  onSelectAnnotation: (annotation: Annotation | null) => void
}

export interface UseAnnotationPointsHandlerReturnType {
  annotation: Annotation | null
  editPoints: EditPoints | null
  currentEditMode: EditMode | null
  cursorStatus: CursorStatus
  setAnnotationEditMode: (targetPoint: EditMode) => void
}
