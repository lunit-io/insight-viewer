import { MeasurementMode, AnnotationMode, Point } from '../../types'

export interface UseDrawingHandlerProps {
  mode: MeasurementMode | AnnotationMode
  svgElement: React.RefObject<SVGSVGElement> | null
  setInitialMeasurement: (point: Point) => void
  addDrawingPoint: (point: Point) => void
  cancelDrawing: () => void
  addDrewElement: () => void
}
