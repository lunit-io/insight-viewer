import { CSSProperties, SVGProps } from 'react'
import { Annotation } from '../../types'

export interface AnnotationViewerProps {
  width?: number
  height?: number

  /** Annotation focused by user interaction such as mouse over */
  annotations: Annotation[]

  hoveredAnnotation: Annotation | null
  selectedAnnotation: Annotation | null

  /** <svg className={}> */
  className?: string

  /** <svg style={}> */
  style?: CSSProperties

  isEditing?: boolean

  /**
   * You can set the attributes of individual annotation objects
   * If you set properties such as strokeWidth, the Style set in Styled Components is ignored
   * It is best not to use it as much as possible except in special cases
   */
  annotationAttrs?: (annotation: Annotation, showOutline: boolean) => SVGProps<SVGPolygonElement>

  onFocus?: (annotation: Annotation | null) => void
  onClick?: (annotation: Annotation) => void

  /**
   * Draw an outline on the line
   * Since the outline is expressed by drawing two lines, it can be deactivated in a performance-sensitive situation
   */
  showOutline?: boolean

  /**
   * annotation label notation flag variable
   * Default value is false
   */
  showAnnotationLabel?: boolean
}

export interface AnnotationsDrawProps extends Omit<AnnotationViewerProps, 'width' | 'height' | 'selectedAnnotation'> {
  showOutline: boolean
  showAnnotationLabel: boolean
}
