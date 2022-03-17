import { AnnotationMode, Annotation, LineHeadMode } from '../../types'

export interface UseAnnotationDrawingProps {
  svgElement: React.RefObject<SVGSVGElement> | null
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'
  annotations: Annotation[]
  mode: AnnotationMode
  lineHead: LineHeadMode
  onAdd: (annotation: Annotation) => void
}
