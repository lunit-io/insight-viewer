import { RefObject } from 'react'

import { EditPoints } from '../../utils/common/getEditPointPosition'
import { MeasurementMode, Measurement, EditMode } from '../../types'

export interface UseMeasurementPointsHandlerParams {
  isEditing: boolean
  mode: MeasurementMode
  measurements: Measurement[]
  selectedMeasurement: Measurement | null
  svgElement: RefObject<SVGSVGElement> | null
  hoveredMeasurement: Measurement | null
  addMeasurement: (measurement: Measurement) => void
  onSelectMeasurement: (measurement: Measurement | null) => void
}

export interface UseMeasurementPointsHandlerReturnType {
  editPoints: EditPoints | null
  currentEditMode: EditMode | null
  measurement: Measurement | null
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
