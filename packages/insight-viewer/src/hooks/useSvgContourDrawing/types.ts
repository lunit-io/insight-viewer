import { Point, Contour } from '../../types'

export interface UseSvgContourDrawingProps<T extends Contour> {
  svgElement: React.RefObject<SVGSVGElement> | null
  device?:
    | 'all'
    | 'mouse-only'
    | 'touch-only'
    | 'stylus-only'
    | 'mouse-and-stylus'
  contours: T[]
  onAdd: (polygon: Point[]) => void
  onFocus: (contour: T | null) => void
  onRemove: (contour: T) => void
}
