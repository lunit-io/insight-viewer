import { Annotation } from '../../types'
import { AnnotationsDrawProps } from '../AnnotationViewer/AnnotationViewer.types'

export interface FreeLineViewerProps<T extends Annotation>
  extends Omit<AnnotationsDrawProps<T>, 'annotations' | 'mode'> {
  annotation: T
}
