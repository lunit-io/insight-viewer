import type { SVGProps } from 'react'
import type { Annotation, AnnotationMode, ClickAction } from '../../types'

export interface AnnotationDrawBoard extends Omit<SVGProps<SVGSVGElement>, 'onSelect' | 'onClick'> {
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

  /**
   * Draw an outline on the line
   * Since the outline is expressed by drawing two lines, it can be deactivated in a performance-sensitive situation
   */
  showOutline?: boolean

  /** When drawing is complete and a new annotation occurs */
  onAdd?: (annotation: Annotation) => void
  onSelect?: (annotation: Annotation | null) => void
  onHover?: (element: Annotation | null) => void
  onClick?: (element: Annotation) => void

  mode?: AnnotationMode
}
