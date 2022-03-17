import { Point, AnnotationMode, LineHeadMode } from '../../types'

export interface PolylineDrawerProps {
  polygon: Point[]
  mode: AnnotationMode
  lineHead: LineHeadMode
}
