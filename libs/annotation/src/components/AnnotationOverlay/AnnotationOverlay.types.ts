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

  onChange?: (annotations: Annotation[]) => void
  onSelect?: (annotation: Annotation | null) => void
  onHover?: (annotation: Annotation | null) => void
  onAdd?: (annotation: Annotation) => Annotation | null
  onRemove?: (annotation: Annotation) => Annotation | null
  elementAttrs?: (annotation: Annotation, showOutline: boolean) => SVGProps<SVGPolygonElement>
}
