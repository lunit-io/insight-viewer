import { Point, EditMode } from '../../types'

export interface RulerDrawerProps {
  textPoint: Point
  rulerPoints: [Point, Point]
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
