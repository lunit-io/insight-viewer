import { Annotation, AnnotationMode } from '../../types'
import { AnnotationViewerProps } from '../AnnotationViewer/AnnotationViewer.types'

export interface AnnotationOverlayProps extends AnnotationViewerProps {
  isDrawing?: boolean
  mode?: AnnotationMode
  selectedAnnotation: Annotation | null
  onFocus?: (annotation: Annotation | null) => void
  onAdd?: (annotation: Annotation) => void
  onRemove?: (annotation: Annotation) => void
  onSelect: (annotation: Annotation | null) => void
}
