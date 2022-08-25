import { EditMode, DrawingCircleMeasurement } from '../../types'

export interface CircleDrawerProps {
  isSelectedMode: boolean
  measurement: DrawingCircleMeasurement
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
