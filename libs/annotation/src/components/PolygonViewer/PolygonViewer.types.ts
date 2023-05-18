import { DrawablePolygonAnnotation } from '../../types'

export interface PolygonViewerProps {
  isHovered: boolean
  showLabel: boolean
  showOutline: boolean
  annotation: DrawablePolygonAnnotation
}
