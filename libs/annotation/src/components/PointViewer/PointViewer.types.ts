import { DrawablePointAnnotation } from '../../types'

export interface PointViewerProps {
  isHovered: boolean
  showLabel: boolean
  showOutline: boolean
  annotation: DrawablePointAnnotation
}
