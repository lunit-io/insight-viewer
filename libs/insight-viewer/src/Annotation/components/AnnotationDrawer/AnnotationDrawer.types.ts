import type { SVGProps } from 'react'
import type { Annotation, AnnotationMode } from '../../types'

export interface AnnotationDrawerProps extends SVGProps<SVGSVGElement> {
  selectedAnnotation: Annotation | null
  hoveredAnnotation: Annotation | null
  annotations: Annotation[]

  isDrawing?: boolean
  isEditing?: boolean

  /**
   * annotation label notation flag variable
   * Default value is false
   */
  showAnnotationLabel?: boolean
  /** When drawing is complete and a new annotation occurs */
  onAdd: (annotation: Annotation) => void
  onSelectAnnotation: (annotation: Annotation | null) => void

  mode?: AnnotationMode
}
