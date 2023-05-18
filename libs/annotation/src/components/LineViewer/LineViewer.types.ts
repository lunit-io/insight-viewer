import { DrawableLineAnnotation, DrawableFreeLineAnnotation, DrawableArrowLineAnnotation } from '../../types'

export interface LineViewerProps {
  isHovered: boolean
  showLabel: boolean
  showOutline: boolean
  annotation: DrawableLineAnnotation | DrawableFreeLineAnnotation | DrawableArrowLineAnnotation
}
