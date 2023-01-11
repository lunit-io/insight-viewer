import type { EditMode, AreaMeasurement, CursorStatus } from '../../types'

export interface CircleDrawerProps {
  isSelectedMode: boolean
  measurement: AreaMeasurement
  setMeasurementEditMode: (targetPoint: EditMode) => void
  cursorStatus: CursorStatus
}
