import { Measurement, MeasurementMode } from '../../types'
import { MeasurementViewerProps } from '../MeasurementViewer/MeasurementViewer.types'

export interface MeasurementOverlayProps extends MeasurementViewerProps {
  mode?: MeasurementMode
  isDrawing?: boolean
  onAdd?: (measurement: Measurement) => void
  selectedMeasurement: Measurement | null
}
