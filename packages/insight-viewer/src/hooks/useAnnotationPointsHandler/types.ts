import { Point, AnnotationMode, Annotation, LineHeadMode, EditMode } from '../../types'
import { EditPoints } from '../../utils/common/getEditPointPosition'

export interface UseAnnotationPointsHandlerParams {
  isEditing: boolean
  mode: AnnotationMode
  lineHead: LineHeadMode
  annotations: Annotation[]
  selectedAnnotation: Annotation | null
  svgElement: React.RefObject<SVGSVGElement> | null
  addAnnotation: (annotation: Annotation) => void
  onSelectAnnotation: (annotation: Annotation | null) => void
}

export interface UseAnnotationPointsHandlerReturnType {
  points: Point[]
  editPoints: EditPoints | null
  currentEditMode: EditMode | null
  setAnnotationEditMode: (targetPoint: EditMode) => void
}
