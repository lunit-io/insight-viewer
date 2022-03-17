import { CSSProperties } from 'react'
import { Annotation, AnnotationMode, LineHeadMode } from '../../types'

export interface AnnotationDrawerProps {
  width?: number
  height?: number

  annotations: Annotation[]

  /** When drawing is complete and a new annotation occurs */
  onAdd: (annotation: Annotation) => void

  className?: string
  style?: CSSProperties

  /**
   * Access Device Settings
   * Only the function for mouse is implemented, and it is not applied
   */
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'

  mode?: AnnotationMode
  lineHead?: LineHeadMode
}
