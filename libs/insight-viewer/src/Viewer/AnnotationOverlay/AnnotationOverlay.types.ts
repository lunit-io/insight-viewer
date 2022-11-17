import { Annotation, AnnotationMode, LineHeadMode } from '../../types'
import { AnnotationViewerProps } from '../AnnotationViewer/AnnotationViewer.types'

export interface AnnotationOverlayProps extends AnnotationViewerProps {
  isDrawing?: boolean
  mode?: AnnotationMode
  selectedAnnotation: Annotation | null
  /**
   *  normal has no head
   *  For arrow, an arrow head is added.
   * @deprecated use arrow line instead
   */
  lineHead?: LineHeadMode
  onFocus?: (annotation: Annotation | null) => void
  onAdd?: (annotation: Annotation) => void
  onRemove?: (annotation: Annotation) => void
  onSelect: (annotation: Annotation | null) => void
}
