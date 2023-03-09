import type {
  EditMode,
  DrawablePolygonAnnotation,
  DrawableFreeLineAnnotation,
  DrawableLineAnnotation,
  DrawableArrowLineAnnotation,
} from '../../types'

export interface PolylineDrawerProps {
  annotation:
    | DrawablePolygonAnnotation
    | DrawableFreeLineAnnotation
    | DrawableLineAnnotation
    | DrawableArrowLineAnnotation
  isSelectedMode: boolean
  showAnnotationLabel: boolean
  selectedAnnotationLabel: string | number | null
  setAnnotationEditMode: (mode: EditMode) => void
  isPolygonSelected: boolean
}
