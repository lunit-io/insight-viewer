import { RefObject } from 'react'

import { EditPoints } from '../../utils/common/getEditPointPosition'
import { MeasurementMode, Measurement, DrawingMeasurement, EditMode } from '../../types'

export interface UseMeasurementPointsHandlerParams {
  isEditing: boolean
  mode: MeasurementMode
  measurements: Measurement[]
  selectedMeasurement: Measurement | null
  svgElement: RefObject<SVGSVGElement> | null
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus'
  addMeasurement: (measurement: Measurement) => void
  onSelectMeasurement: (measurement: Measurement | null) => void
}

export interface UseMeasurementPointsHandlerReturnType {
  editPoints: EditPoints | null
  measurement: DrawingMeasurement | null
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
