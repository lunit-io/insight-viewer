import { Point, EditMode } from '../../types'

export interface CircleDrawerProps {
  points: Point[]
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
