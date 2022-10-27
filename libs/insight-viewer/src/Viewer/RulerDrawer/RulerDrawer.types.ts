import type { CursorStatus, EditMode, RulerMeasurement } from '../../types'

export interface RulerDrawerProps {
  isSelectedMode: boolean
  measurement: RulerMeasurement
  setMeasurementEditMode: (targetPoint: EditMode) => void
  cursorStatus: CursorStatus
}
