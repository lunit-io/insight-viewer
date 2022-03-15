import { AnnotationMode, Annotation } from '../../types'

export interface UseAnnotationDrawingProps {
  svgElement: React.RefObject<SVGSVGElement> | null
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'
  annotations: Annotation[]
  mode: AnnotationMode
  onAdd: (annotation: Annotation) => void
}
