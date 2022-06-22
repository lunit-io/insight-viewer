import { MeasurementMode, AnnotationMode, Point } from '../../types'

export interface UseDrawingHandlerParams {
  mode: MeasurementMode | AnnotationMode
  svgElement: React.RefObject<SVGSVGElement> | null
  setInitialPoint: (point: Point) => void
  addDrawingPoint: (point: Point) => void
  cancelDrawing: () => void
  addDrewElement: () => void
}
