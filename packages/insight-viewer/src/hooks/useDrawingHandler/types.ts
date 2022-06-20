import { MeasurementMode, AnnotationMode, Point } from '../../types'

export interface UseDrawingHandlerProps {
  mode: MeasurementMode | AnnotationMode
  svgElement: React.RefObject<SVGSVGElement> | null
  setInitialMeasurement: (point: Point) => void
  addDrawingMeasurement: (point: Point) => void
  cancelDrawing: () => void
  addDrewElement: () => void
}
