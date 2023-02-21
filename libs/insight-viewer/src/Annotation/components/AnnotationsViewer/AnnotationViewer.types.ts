import type { CSSProperties } from 'react'
import type { Annotation } from '../../types'

export interface AnnotationsViewerProps {
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

  onFocus?: (element: Annotation | null) => void
  onClick?: (element: Annotation) => void

  /**
   * Draw an outline on the line
   * Since the outline is expressed by drawing two lines, it can be deactivated in a performance-sensitive situation
   */
  showOutline?: boolean

  /**
   * annotation label notation flag variable
   * Default value is false
   */
  showElementLabel?: boolean
}
