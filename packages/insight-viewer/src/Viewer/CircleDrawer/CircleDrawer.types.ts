import { Point, EditMode } from '../../types'

export interface CircleDrawerProps {
  points: Point[]
  canvasPoints: Point[]
  textPoint: Point
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
