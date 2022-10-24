import { SVGProps } from 'react'
import { Annotation, AnnotationMode, LineHeadMode } from '../../types'

export interface AnnotationDrawerProps extends SVGProps<SVGSVGElement> {
  selectedAnnotation: Annotation | null
  hoveredAnnotation: Annotation | null
  annotations: Annotation[]

  isEditing?: boolean

  /**
   * annotation label notation flag variable
   * Default value is false
   */
  showAnnotationLabel?: boolean

  /** When drawing is complete and a new annotation occurs */
  onAdd: (annotation: Annotation) => void
  onSelectAnnotation: (annotation: Annotation | null) => void
  /**
   * Access Device Settings
   * Only the function for mouse is implemented, and it is not applied
   */
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'

  mode?: AnnotationMode
  lineHead?: LineHeadMode
}
