import { Point, EditMode } from '../../types'

export interface RulerDrawerProps {
  points: Point[]
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
