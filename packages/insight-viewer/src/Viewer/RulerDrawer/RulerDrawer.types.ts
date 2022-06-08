import { Point, EditMode } from '../../types'

export interface RulerDrawerProps {
  points: Point[]
  textPoint: Point
  canvasPoints: Point[]
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
