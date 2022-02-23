import { Contour } from '../../types'
import { AnnotationsDrawProps } from '../AnnotationViewer/AnnotationViewer.types'

export interface FreeLineViewerProps<T extends Contour>
  extends Omit<AnnotationsDrawProps<T>, 'contours' | 'mode'> {
  contour: T
}
