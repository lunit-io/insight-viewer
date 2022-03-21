import { Measurement } from '../../types'
import { MeasurementViewerProps } from '../MeasurementViewer/MeasurementViewer.types'

export interface MeasurementOverlayProps extends MeasurementViewerProps {
  isDrawing?: boolean
  onFocus?: (measurement: Measurement | null) => void
  onAdd?: (measurement: Measurement) => void
  onRemove?: (measurement: Measurement) => void
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'
}
