import { SVGProps } from 'react'
import { Annotation, AnnotationMode } from '../../types'

export interface AnnotationDrawerProps extends SVGProps<SVGSVGElement> {
  selectedAnnotation: Annotation | null
  annotations: Annotation[]

  isDrawing?: boolean
  isEditing?: boolean

  /**
   * annotation label notation flag variable
   * Default value is false
   */
  showAnnotationLabel?: boolean
  hoveredAnnotation: Annotation | null
  /** When drawing is complete and a new annotation occurs */
  onAdd: (annotation: Annotation) => void
  onSelectAnnotation: (annotation: Annotation | null) => void

  mode?: AnnotationMode
}
