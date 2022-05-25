import { EditMode, Point } from '../../types'

export interface TextDrawerProps {
  points: Point[]
  setAnnotationEditMode: (mode: EditMode) => void
  label?: string
}
