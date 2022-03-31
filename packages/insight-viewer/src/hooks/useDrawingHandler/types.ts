import { Measurement, MeasurementMode, Point } from '../../types'

export interface UseDrawingHandlerProps {
  isEditing: boolean
  mode: MeasurementMode
  selectedMeasurement: Measurement | null
  svgElement: React.RefObject<SVGSVGElement> | null
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'
  cancelDrawing: () => void
  addDrewMeasurement: () => void
  addStartPoint: (point: Point) => void
  addDrawingPoint: (point: Point) => void
}
