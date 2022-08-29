import { EditMode, CircleMeasurement } from '../../types'

export interface CircleDrawerProps {
  isSelectedMode: boolean
  measurement: CircleMeasurement
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
