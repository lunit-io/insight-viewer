import { LineHeadMode, EditMode, PolygonAnnotation, FreeLineAnnotation, LineAnnotation } from '../../types'

export interface PolylineDrawerProps {
  annotation: PolygonAnnotation | FreeLineAnnotation | LineAnnotation
  isSelectedMode: boolean
  lineHead: LineHeadMode
  showAnnotationLabel: boolean
  selectedAnnotationLabel: string | number | null
  setAnnotationEditMode: (mode: EditMode) => void
  isPolygonSelected: boolean
}
