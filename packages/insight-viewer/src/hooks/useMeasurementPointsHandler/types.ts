import { RefObject } from 'react'

import { EditPoints } from '../../utils/common/getEditPointPosition'
import { Point, MeasurementMode, Measurement, EditMode } from '../../types'

export interface UseMeasurementPointsHandlerProps {
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
  points: Point[]
  canvasPoints: Point[]
  textPoint: Point | null
  editPoints: EditPoints | null
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
