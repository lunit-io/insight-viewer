import { Point, EditMode } from '../../types'

export interface RulerDrawerProps {
  textPoint: Point
  rulerPoints: Point[]
  setMeasurementEditMode: (targetPoint: EditMode) => void
}
