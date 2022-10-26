import type { RefObject } from 'react'
import type { EditPoints } from '../../utils/common/getEditPointPosition'
import type { MeasurementMode, Measurement, EditMode, CursorStatus } from '../../types'

export interface UseMeasurementPointsHandlerParams {
  isEditing: boolean
  mode: MeasurementMode
  measurements: Measurement[]
  selectedMeasurement: Measurement | null
  hoveredMeasurement: Measurement | null
  svgElement: RefObject<SVGSVGElement> | null
  addMeasurement?: (measurement: Measurement) => void
  onSelectMeasurement: (measurement: Measurement | null) => void
}

export interface UseMeasurementPointsHandlerReturnType {
  editPoints: EditPoints | null
  currentEditMode: EditMode | null
  measurement: Measurement | null
  cursorStatus: CursorStatus
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
