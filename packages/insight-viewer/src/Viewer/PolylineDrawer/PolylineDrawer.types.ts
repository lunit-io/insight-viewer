import { Point, LineHeadMode, EditMode } from '../../types'

export interface PolylineDrawerProps {
  points: Point[]
  isSelectedMode: boolean
  lineHead: LineHeadMode
  selectedAnnotationLabel: string | number | null
  setAnnotationEditMode: (mode: EditMode) => void
  isPolygonSelected?: boolean
}
