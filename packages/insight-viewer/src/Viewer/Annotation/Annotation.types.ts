import { Contour, Point } from '../../types'
import { AnnotationViewerProps } from '../AnnotationViewer/AnnotationViewer.types'

export interface AnnotationProps<T extends Contour>
  extends AnnotationViewerProps<T> {
  isDrawing?: boolean
  onFocus?: (contour: T | null) => void
  onAdd?: (polygon: Point[]) => void
  onRemove?: (contour: T) => void
  device?:
    | 'all'
    | 'mouse-only'
    | 'touch-only'
    | 'stylus-only'
    | 'mouse-and-stylus'
}
