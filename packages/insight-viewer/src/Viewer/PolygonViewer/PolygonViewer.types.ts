import { Annotation } from '../../types'
import { AnnotationsDrawProps } from '../AnnotationViewer/AnnotationViewer.types'

export interface PolygonViewerProps<T extends Annotation>
  extends Omit<AnnotationsDrawProps<T>, 'annotations' | 'mode'> {
  annotation: T
}
