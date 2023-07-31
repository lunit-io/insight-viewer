import { validateAnnotation } from './validateAnnotation'

import type { Annotation } from '../../../types'

interface AddAnnotationParams {
  annotation: Annotation | null
  annotations: Annotation[]
  selectedAnnotation?: Annotation | null
  onAdd?: (annotation: Annotation) => Annotation | null
  onChange?: (annotations: Annotation[]) => void
}

export const addAnnotation =
  ({ annotations, selectedAnnotation, onAdd, onChange }: AddAnnotationParams) =>
  (annotation: Annotation) => {
    let addedTargetAnnotation: Annotation | null = annotation

    addedTargetAnnotation = validateAnnotation(addedTargetAnnotation)

    if (addedTargetAnnotation && onAdd) {
      addedTargetAnnotation = onAdd(addedTargetAnnotation)
    }

    if (!onChange) return

    if (!addedTargetAnnotation) {
      onChange(annotations)
      return
    }

    if (selectedAnnotation) {
      onChange(annotations.map((prevAnnotation) => (prevAnnotation.id === annotation.id ? annotation : prevAnnotation)))
      return
    }

    onChange([...annotations, addedTargetAnnotation])
  }
