import { Point, Annotation, AnnotationMode } from '../../types'

export interface UseAnnotationDrawingProps<T extends Annotation> {
  svgElement: React.RefObject<SVGSVGElement> | null
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'
  annotations: T[]
  mode: AnnotationMode
  onAdd: (polygon: Point[]) => void
}
