import { CSSProperties } from 'react'
import { Annotation, AnnotationMode, AnnotationLayer, HeadType } from '../../types'

export interface AnnotationDrawerProps<T extends Annotation> {
  width?: number
  height?: number

  annotations: T[]

  /** When drawing is complete and a new annotation occurs */
  onAdd: (layer: AnnotationLayer) => void

  className?: string
  style?: CSSProperties

  /**
   * Access Device Settings
   * Only the function for mouse is implemented, and it is not applied
   */
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'

  mode?: AnnotationMode
  head?: HeadType
}
