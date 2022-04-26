import { Point, AnnotationMode, LineHeadMode } from '../../types'

export interface PolylineDrawerProps {
  points: Point[]
  mode: AnnotationMode
  lineHead: LineHeadMode
}
