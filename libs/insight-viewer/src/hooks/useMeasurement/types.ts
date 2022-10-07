import type { Measurement, MeasurementBase } from '../../types'

export interface UseMeasurementParams {
  nextId?: number
  initialMeasurement?: Measurement[]
}

export interface MeasurementDrawingState {
  measurements: Measurement[]
  hoveredMeasurement: Measurement | null
  selectedMeasurement: Measurement | null
  addMeasurement: (measurement: Measurement) => Measurement | null
  hoverMeasurement: (measurement: Measurement | null) => void
  selectMeasurement: (measurement: Measurement | null) => void
  updateMeasurement: (measurement: Measurement, patch: Partial<Omit<MeasurementBase, 'id' | 'type'>>) => void
  removeMeasurement: (measurement: Measurement) => void
  removeAllMeasurement: () => void
}
