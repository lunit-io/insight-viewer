import { Point, AnnotationMode, LineHeadMode, EditMode } from '../../types'

export interface PolylineDrawerProps {
  points: Point[]
  mode: AnnotationMode
  lineHead: LineHeadMode
  setAnnotationEditMode: (mode: EditMode) => void
}
