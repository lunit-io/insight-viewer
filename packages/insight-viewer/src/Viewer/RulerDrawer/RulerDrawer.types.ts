import { Point, EditMode } from '../../types'

export interface RulerDrawerProps {
  points: Point[]
  setEditTargetPoint: (targetPoint: EditMode) => void
}
