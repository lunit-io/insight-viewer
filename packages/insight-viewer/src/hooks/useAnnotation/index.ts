import { useState, useEffect } from 'react'
import polylabel from 'polylabel'
import { AnnotationMode, Annotation, AnnotationBase } from '../../types'
import { getIsPolygonAreaGreaterThanArea } from '../../utils/common/getIsPolygonAreaGreaterThanArea'
import { getIsComplexPolygon } from '../../utils/common/getIsComplexPolygon'
import { isValidLength } from '../../utils/common/isValidLength'

function validateDataAttrs(dataAttrs?: { [attr: string]: string }) {
  if (!dataAttrs) return

  Object.keys(dataAttrs).forEach(attr => {
    if (!/^data-/.test(attr)) {
      throw new Error(`Annotation.dataAttrs 속성은 data-* 형태의 이름으로 입력되어야 합니다 (${attr})`)
    }
  })
}

interface UseAnnotationProps {
  nextId?: number
  initialAnnotation?: Annotation[]
  mode?: AnnotationMode
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
}

export function useAnnotation({
  nextId,
  initialAnnotation,
  mode = 'polygon',
}: UseAnnotationProps): AnnotationDrawingState {
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
              id: nextId ?? i,
              labelPosition: polylabel([annotationLabelPoints], 1),
            } as Annotation
          })
        : []
    )
  }, [initialAnnotation, nextId])

  const addAnnotation = (
    annotation: Annotation,
    annotationInfo: Pick<Annotation, 'dataAttrs'> | undefined
  ): Annotation | null => {
    if (annotation.type !== mode) throw Error('The mode of component and hook is different')
    if (
      annotation.type === 'polygon' &&
      (!getIsPolygonAreaGreaterThanArea(annotation.points) || getIsComplexPolygon(annotation.points))
    )
      return null
    if (annotation.type === 'freeLine' && !getIsPolygonAreaGreaterThanArea(annotation.points)) return null
    if (annotation.type === 'line' && !isValidLength(annotation.points)) return null
    if (annotationInfo?.dataAttrs) {
      validateDataAttrs(annotationInfo?.dataAttrs)
    }

    setAnnotations(prevAnnotations => [...prevAnnotations, annotation])

    return annotation
  }

  const hoverAnnotation = (annotation: Annotation | null) => {
    setHoveredAnnotation(prevHoveredAnnotation =>
      annotation !== prevHoveredAnnotation ? annotation : prevHoveredAnnotation
    )
  }

  const removeAnnotation = (annotation: Annotation) => {
    setAnnotations(prevAnnotations => {
      const index = prevAnnotations.findIndex(({ id }) => id === annotation.id)

      if (index > -1) {
        const nextAnnotations = [...prevAnnotations]
        nextAnnotations.splice(index, 1)

        return nextAnnotations
      }

      return prevAnnotations
    })

    setHoveredAnnotation(null)
  }

  const selectAnnotation = (annotation: Annotation | null) => {
    if (annotation) removeAnnotation(annotation)

    setSelectedAnnotation(prevSelectedAnnotation =>
      annotation !== prevSelectedAnnotation ? annotation : prevSelectedAnnotation
    )
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

    setAnnotations(prevAnnotations => {
      const nextAnnotations = [...prevAnnotations]
      const index: number = nextAnnotations.findIndex(({ id }) => nextAnnotation.id === id)

      if (index > -1) {
        nextAnnotations[index] = nextAnnotation

        setHoveredAnnotation(prevHoveredAnnotation =>
          annotation === prevHoveredAnnotation ? nextAnnotation : prevHoveredAnnotation
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
  }
}
