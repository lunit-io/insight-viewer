import type { CSSProperties, SVGProps } from 'react'

import type { Annotation, AnnotationMode, ClickAction } from '../../types'

export interface AnnotationOverlayProps {
  width?: number
  height?: number
  className?: string
  style?: CSSProperties
  isDrawing?: boolean
  clickAction?: ClickAction
  showOutline?: boolean
  showAnnotationLabel?: boolean
  mode: AnnotationMode
  hoveredAnnotation?: Annotation | null
  selectedAnnotation?: Annotation | null
  annotations: Annotation[]

  onAdd?: (annotation: Annotation) => void
  onClick?: (annotation: Annotation) => void
  onRemove?: (annotation: Annotation) => void
  onSelect?: (annotation: Annotation | null) => void
  onMouseOver?: (annotation: Annotation | null) => void
  elementAttrs?: (annotation: Annotation, showOutline: boolean) => SVGProps<SVGPolygonElement>
}
