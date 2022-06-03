import { Point, LineHeadMode, EditMode } from '../../types'

export interface PolylineDrawerProps {
  points: Point[]
  isSelectedMode: boolean
  lineHead: LineHeadMode
  setAnnotationEditMode: (mode: EditMode) => void
}
