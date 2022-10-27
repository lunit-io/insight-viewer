import { Measurement, MeasurementMode } from '../../types'
import { MeasurementViewerProps } from '../MeasurementViewer/MeasurementViewer.types'

export interface MeasurementOverlayProps extends MeasurementViewerProps {
  mode?: MeasurementMode
  isDrawing?: boolean
  onAdd?: (measurement: Measurement) => void
  onRemove?: (measurement: Measurement) => void
  onSelect: (measurement: Measurement | null) => void
  selectedMeasurement: Measurement | null
}
