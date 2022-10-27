import type { EditMode, CircleMeasurement, CursorStatus } from '../../types'

export interface CircleDrawerProps {
  isSelectedMode: boolean
  measurement: CircleMeasurement
  setMeasurementEditMode: (targetPoint: EditMode) => void
  cursorStatus: CursorStatus
}
