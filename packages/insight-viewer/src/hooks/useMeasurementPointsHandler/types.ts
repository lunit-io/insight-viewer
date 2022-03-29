import { RefObject } from 'react'

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
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
