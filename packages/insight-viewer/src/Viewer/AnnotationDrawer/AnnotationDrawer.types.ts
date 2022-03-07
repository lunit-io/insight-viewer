import { CSSProperties } from 'react'
import { Annotation, Point, AnnotationMode } from '../../types'

export interface AnnotationDrawerProps<T extends Annotation> {
  width?: number
  height?: number

  annotations: T[]

  /**
   * When Mouse Over on a annotation
   * Required to determine focused Annotation
   */
  onFocus: (annotation: T | null) => void

  /** When drawing is complete and a new annotation occurs */
  onAdd: (polygon: Point[]) => void

  /** Needed to delete a specific annotation by clicking on it */
  onRemove: (annotation: T) => void

  className?: string
  style?: CSSProperties

  /**
   * Access Device Settings
   * Only the function for mouse is implemented, and it is not applied
   */
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'

  mode?: AnnotationMode
}
