import { CSSProperties } from 'react'
import { Annotation } from '../../types'

export interface AnnotationViewerProps {
  width?: number
  height?: number

  /** Annotation focused by user interaction such as mouse over */
  annotations: Annotation[]

  hoveredAnnotation: Annotation | null

  /** <svg className={}> */
  className?: string

  /** <svg style={}> */
  style?: CSSProperties

  isEditing?: boolean

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

export interface AnnotationsDrawProps extends Omit<AnnotationViewerProps, 'width' | 'height'> {
  showOutline: boolean
  showAnnotationLabel: boolean
}
