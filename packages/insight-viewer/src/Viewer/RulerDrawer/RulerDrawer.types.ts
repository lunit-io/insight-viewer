import { EditMode, DrawingRulerMeasurement } from '../../types'

export interface RulerDrawerProps {
  measurement: DrawingRulerMeasurement
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
