import { Point, EditPoint } from '../../types'

export interface RulerDrawerProps {
  points: Point[]
  setEditTargetPoint: (targetPoint: EditPoint) => void
}
