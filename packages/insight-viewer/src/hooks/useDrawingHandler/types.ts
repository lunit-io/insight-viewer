import { MeasurementMode, AnnotationMode, Point } from '../../types'

export interface UseDrawingHandlerParams {
  mode: MeasurementMode | AnnotationMode
  svgElement: React.RefObject<SVGSVGElement> | null
  setInitialElement: (point: Point) => void
  addDrawingElement: (point: Point) => void
  cancelDrawing: () => void
  addDrewElement: () => void
}
