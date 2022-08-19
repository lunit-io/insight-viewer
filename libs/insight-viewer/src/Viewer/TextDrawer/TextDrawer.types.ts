import { EditMode, Point } from '../../types'

export interface TextDrawerProps {
  points: Point[]
  isSelectedMode: boolean
  setAnnotationEditMode: (mode: EditMode) => void
  label?: string
}
