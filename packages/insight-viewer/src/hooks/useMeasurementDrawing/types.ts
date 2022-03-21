import { MeasurementMode, Measurement } from '../../types'

export interface UseMeasurementDrawingProps {
  svgElement: React.RefObject<SVGSVGElement> | null
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'
  measurements: Measurement[]
  mode: MeasurementMode
  onAdd: (annotation: Measurement) => void
}
