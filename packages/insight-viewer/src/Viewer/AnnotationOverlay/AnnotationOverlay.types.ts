import { Annotation, AnnotationLayer, HeadType } from '../../types'
import { AnnotationViewerProps } from '../AnnotationViewer/AnnotationViewer.types'

export interface AnnotationOverlayProps<T extends Annotation> extends AnnotationViewerProps<T> {
  isDrawing?: boolean
  head?: HeadType
  onFocus?: (annotation: T | null) => void
  onAdd?: (layer: AnnotationLayer) => void
  onRemove?: (annotation: T) => void
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'
}
