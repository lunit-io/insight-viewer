import { Point, AnnotationMode, HeadType } from '../../types'

export interface PolylineDrawerProps {
  polygon: Point[]
  mode: AnnotationMode
  head: HeadType
}
