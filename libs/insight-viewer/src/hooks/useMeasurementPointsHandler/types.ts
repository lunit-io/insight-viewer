import { RefObject } from 'react'

import { EditPoints } from '../../utils/common/getEditPointPosition'
import { MeasurementMode, Measurement, EditMode } from '../../types'

export interface UseMeasurementPointsHandlerParams {
  isEditing: boolean
  mode: MeasurementMode
  measurements: Measurement[]
  selectedMeasurement: Measurement | null
  hoveredMeasurement: Measurement | null
  svgElement: RefObject<SVGSVGElement> | null
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'
  addMeasurement?: (measurement: Measurement) => void
  onSelectMeasurement: (measurement: Measurement | null) => void
}

export interface UseMeasurementPointsHandlerReturnType {
  editPoints: EditPoints | null
  currentEditMode: EditMode | null
  measurement: Measurement | null
  cursorStatus: string
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
