import { DrawableTextAnnotation } from '../../types'

export interface TextViewerProps {
  isHovered: boolean
  showLabel: boolean
  showOutline: boolean
  annotation: DrawableTextAnnotation
}
