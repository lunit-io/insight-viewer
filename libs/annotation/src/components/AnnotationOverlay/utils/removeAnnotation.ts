import type { Annotation } from '../../../types'

interface RemoveAnnotationParams {
  annotations: Annotation[]
  onRemove?: (annotation: Annotation) => Annotation | null
  onChange?: (annotations: Annotation[]) => void
}

export const removeAnnotation =
  ({ annotations, onRemove, onChange }: RemoveAnnotationParams) =>
  (annotation: Annotation) => {
    let removedTargetAnnotation: Annotation | null = annotation

    if (onRemove) {
      removedTargetAnnotation = onRemove(annotation)
    }

    if (!onChange) return

    if (!removedTargetAnnotation) {
      onChange(annotations)
      return
    }

    onChange(annotations.filter((a) => a.id !== annotation.id))
  }
