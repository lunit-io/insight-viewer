import { Point, Contour, AnnotationMode } from '../../types'

export interface UseAnnotationDrawingProps<T extends Contour> {
  svgElement: React.RefObject<SVGSVGElement> | null
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'
  annotations: T[]
  onAdd: (polygon: Point[]) => void
  onFocus: (annotation: T | null) => void
  onRemove: (annotation: T) => void
  mode: AnnotationMode
}
