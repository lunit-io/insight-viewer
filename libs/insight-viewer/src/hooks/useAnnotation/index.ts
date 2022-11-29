import { useState, useEffect } from 'react'
import polylabel from 'polylabel'
import { Annotation, AnnotationBase } from '../../types'
import { getIsComplexPolygon } from './shared/getIsComplexPolygon'
import { isSamePoints } from '../../utils/common/isSamePoints'
import { isLessThanTheMinimumPointsLength } from './shared/isLessThanTheMinimumPointsLength'

function validateDataAttrs(dataAttrs?: { [attr: string]: string }) {
  if (!dataAttrs) return

  Object.keys(dataAttrs).forEach((attr) => {
    if (!/^data-/.test(attr)) {
      throw new Error(`Annotation.dataAttrs 속성은 data-* 형태의 이름으로 입력되어야 합니다 (${attr})`)
    }
  })
}

interface UseAnnotationParams {
  nextId?: number
  initialAnnotation?: Annotation[]
}

interface AnnotationDrawingState {
  annotations: Annotation[]
  hoveredAnnotation: Annotation | null
  selectedAnnotation: Annotation | null
  addAnnotation: (annotation: Annotation, annotationInfo?: Pick<Annotation, 'dataAttrs'>) => Annotation | null
  hoverAnnotation: (annotation: Annotation | null) => void
  selectAnnotation: (annotation: Annotation | null) => void
  updateAnnotation: (annotation: Annotation, patch: Partial<Omit<AnnotationBase, 'id' | 'type'>>) => void
  removeAnnotation: (annotation: Annotation) => void
  removeAllAnnotation: () => void
  resetAnnotation: () => void
}

export function useAnnotation({ nextId = 1, initialAnnotation }: UseAnnotationParams = {}): AnnotationDrawingState {
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [hoveredAnnotation, setHoveredAnnotation] = useState<Annotation | null>(null)
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null)

  useEffect(() => {
    setAnnotations(() =>
      initialAnnotation
        ? initialAnnotation.map<Annotation>((addedAnnotation, i) => {
            const annotationLabelPoints =
              addedAnnotation.type === 'circle' ? [addedAnnotation.center] : addedAnnotation.points

            return {
              ...addedAnnotation,
              id: addedAnnotation.id ?? nextId + i,
              labelPosition: addedAnnotation.labelPosition ?? polylabel([annotationLabelPoints], 1),
            } as Annotation
          })
        : []
    )
  }, [initialAnnotation, nextId])

  const addAnnotation = (
    annotation: Annotation,
    annotationInfo: Pick<Annotation, 'dataAttrs'> | undefined
  ): Annotation | null => {
    if (
      annotation.type === 'polygon' &&
      (isLessThanTheMinimumPointsLength(annotation.points) || getIsComplexPolygon(annotation.points))
    )
      return null
    if (annotation.type === 'freeLine' && isLessThanTheMinimumPointsLength(annotation.points)) return null
    if ((annotation.type === 'line' || annotation.type === 'arrowLine') && isSamePoints(annotation.points)) return null
    if (annotationInfo?.dataAttrs) {
      validateDataAttrs(annotationInfo?.dataAttrs)
    }

    setAnnotations((prevAnnotations) => {
      if (!selectedAnnotation) return [...prevAnnotations, annotation]

      return prevAnnotations.map((prevAnnotation) =>
        prevAnnotation.id === annotation.id ? annotation : prevAnnotation
      )
    })

    return annotation
  }

  const hoverAnnotation = (annotation: Annotation | null) => {
    setHoveredAnnotation(annotation)
  }

  const removeAnnotation = (annotation: Annotation) => {
    setAnnotations((prevAnnotations) => {
      const index = prevAnnotations.findIndex(({ id }) => id === annotation.id)

      if (index > -1) {
        const nextAnnotations = [...prevAnnotations]
        nextAnnotations.splice(index, 1)

        return nextAnnotations
      }

      return prevAnnotations
    })
  }

  const selectAnnotation = (annotation: Annotation | null) => {
    setSelectedAnnotation(annotation)
  }

  const updateAnnotation = (annotation: Annotation, patch: Partial<Omit<AnnotationBase, 'id' | 'type'>>) => {
    if (patch.dataAttrs) {
      validateDataAttrs(patch.dataAttrs)
    }

    const nextAnnotation: Annotation = {
      ...annotation,
      ...patch,
      id: annotation.id,
    }

    setAnnotations((prevAnnotations) => {
      const nextAnnotations = [...prevAnnotations]
      const index: number = nextAnnotations.findIndex(({ id }) => nextAnnotation.id === id)

      if (index > -1) {
        nextAnnotations[index] = nextAnnotation

        setHoveredAnnotation((prevHoveredAnnotation) =>
          annotation.id === prevHoveredAnnotation?.id ? nextAnnotation : prevHoveredAnnotation
        )
      }

      return nextAnnotations
    })

    return nextAnnotation
  }

  const removeAllAnnotation = () => {
    setAnnotations([])
    setHoveredAnnotation(null)
    setSelectedAnnotation(null)
  }

  const resetAnnotation = () => {
    setAnnotations(initialAnnotation || [])
    setHoveredAnnotation(null)
    setSelectedAnnotation(null)
  }

  return {
    annotations,
    hoveredAnnotation,
    selectedAnnotation,
    addAnnotation,
    removeAnnotation,
    updateAnnotation,
    hoverAnnotation,
    selectAnnotation,
    removeAllAnnotation,
    resetAnnotation,
  }
}
