import { LineAnnotation, AnnotationViewerProps, FreeLineAnnotation, ArrowLineAnnotation } from '../../types'

export type LineViewerProps = AnnotationViewerProps<LineAnnotation | FreeLineAnnotation | ArrowLineAnnotation>
