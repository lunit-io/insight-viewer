import { Point, AnnotationMode, LineHeadMode, EditMode } from '../../types'

export interface PolylineDrawerProps {
  points: Point[]
  isSelectedMode: boolean
  mode: AnnotationMode
  lineHead: LineHeadMode
  setAnnotationEditMode: (mode: EditMode) => void
}
