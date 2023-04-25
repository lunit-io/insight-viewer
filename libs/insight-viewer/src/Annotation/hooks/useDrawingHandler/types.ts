import { Point, Annotation } from '../../types'

export interface UseDrawingHandlerParams {
  svgElement: React.RefObject<SVGSVGElement> | null
  setInitialPoint: (point: Point) => void
  addDrawingPoint: (point: Point) => void
  cancelDrawing: () => void
  addDrewElement: () => void
  hoveredDrawing?: Annotation | null
}
