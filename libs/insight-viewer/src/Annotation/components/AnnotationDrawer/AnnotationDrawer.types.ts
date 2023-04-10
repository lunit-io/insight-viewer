import type { SVGProps } from 'react'
import type { Annotation, AnnotationMode, ClickAction } from '../../types'

export interface AnnotationDrawerProps extends Omit<SVGProps<SVGSVGElement>, 'onSelect'> {
  selectedAnnotation?: Annotation | null
  hoveredAnnotation?: Annotation | null
  annotations: Annotation[]

  isDrawing: boolean
  clickAction: ClickAction

  /**
   * annotation label notation flag variable
   * Default value is false
   */
  showAnnotationLabel?: boolean
  /** When drawing is complete and a new annotation occurs */
  onAdd?: (annotation: Annotation) => void
  onSelect?: (annotation: Annotation | null) => void

  mode?: AnnotationMode
}
