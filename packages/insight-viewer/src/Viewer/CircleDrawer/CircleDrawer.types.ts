import { Point, EditMode } from '../../types'

export interface CircleDrawerProps {
  points: [Point, Point]
  textPoint: Point
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
