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
  selectedAnnotation: Annotation | null
  addAnnotation: (annotation: Annotation, annotationInfo?: Pick<Annotation, 'dataAttrs'>) => Annotation | null
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
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null)

  useEffect(() => {
    setAnnotations(() =>
      initialAnnotation
        ? initialAnnotation.map<Annotation>((addedAnnotation, i) => {
            const annotiaotnLabelPoints =
              addedAnnotation.type === 'circle' ? [addedAnnotation.center] : addedAnnotation.points

            return {
              ...addedAnnotation,
              id: nextId ?? i,
              labelPosition: polylabel([annotiaotnLabelPoints], 1),
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

  const selectAnnotation = (annotation: Annotation | null) => {
    setSelectedAnnotation(prevSelectedAnnotation =>
      annotation !== prevSelectedAnnotation ? annotation : prevSelectedAnnotation
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

    setSelectedAnnotation(null)
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

        setSelectedAnnotation(prevSelectedAnnotation =>
          annotation === prevSelectedAnnotation ? nextAnnotation : prevSelectedAnnotation
        )
      }

      return nextAnnotations
    })

    return nextAnnotation
  }

  const removeAllAnnotation = () => {
    setAnnotations([])
    setSelectedAnnotation(null)
  }

  return {
    annotations,
    selectedAnnotation,
    addAnnotation,
    removeAnnotation,
    updateAnnotation,
    selectAnnotation,
    removeAllAnnotation,
  }
}
