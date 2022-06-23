import { EditMode, DrawingCircleMeasurement } from '../../types'

export interface CircleDrawerProps {
  measurement: DrawingCircleMeasurement
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
