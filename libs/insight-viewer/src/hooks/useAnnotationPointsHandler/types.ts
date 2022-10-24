import { AnnotationMode, Annotation, LineHeadMode, EditMode } from '../../types'
import { EditPoints } from '../../utils/common/getEditPointPosition'

export interface UseAnnotationPointsHandlerParams {
  isEditing: boolean
  mode: AnnotationMode
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
  setAnnotationEditMode: (targetPoint: EditMode) => void
}
