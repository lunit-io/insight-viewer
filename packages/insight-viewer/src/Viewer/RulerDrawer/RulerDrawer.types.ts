import { EditMode, DrawingRulerMeasurement } from 'types'

export interface RulerDrawerProps {
  isSelectedMode: boolean
  measurement: DrawingRulerMeasurement
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
