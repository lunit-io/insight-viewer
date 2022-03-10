import { useState, useEffect } from 'react'
import polylabel from 'polylabel'
import { Annotation, AnnotationMode, AnnotationLayer } from '../../types'
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

interface UseAnnotationProps<T extends Annotation> {
  nextId?: number
  initalAnnotation?: Omit<T, 'id'>[]
  mode?: AnnotationMode
}

interface AnnotationDrawingState<T extends Annotation> {
  annotations: T[]
  selectedAnnotation: T | null
  addAnnotation: (layer: AnnotationLayer, annotationInfo?: Omit<T, 'id' | 'layer'>) => T | null
  selectAnnotation: (annotation: T | null) => void
  updateAnnotation: (annotation: T, patch: Partial<T>) => void
  removeAnnotation: (annotation: T) => void
  removeAllAnnotation: () => void
}

export function useAnnotation<T extends Annotation>({
  nextId,
  initalAnnotation,
  mode = 'polygon',
}: UseAnnotationProps<T>): AnnotationDrawingState<T> {
  const [annotations, setAnnotations] = useState<T[]>([])
  const [selectedAnnotation, setSelectedAnnotation] = useState<T | null>(null)

  useEffect(() => {
    setAnnotations(() =>
      initalAnnotation
        ? initalAnnotation.map<T>(
            (addedAnnotation, i) =>
              ({
                ...addedAnnotation,
                id: nextId ?? i,
                labelPosition: polylabel([addedAnnotation.layer.points], 1),
              } as T)
          )
        : []
    )
  }, [initalAnnotation, nextId])

  const addAnnotation = (
    layer: AnnotationLayer,
    annotationInfo: Partial<Omit<T, 'id' | 'layer'>> | undefined
  ): T | null => {
    if (layer.type !== mode) throw Error('The mode of component and hook is different')
    if (
      layer.type === 'polygon' &&
      (!getIsPolygonAreaGreaterThanArea(layer.points) || getIsComplexPolygon(layer.points))
    )
      return null
    if (layer.type === 'freeLine' && !getIsPolygonAreaGreaterThanArea(layer.points)) return null
    if (layer.type === 'line' && !isValidLength(layer.points)) return null
    if (annotationInfo?.dataAttrs) {
      validateDataAttrs(annotationInfo?.dataAttrs)
    }

    let annotation: T | null = null

    setAnnotations(prevAnnotations => {
      const labelPosition = polylabel([layer.points], 1)
      const currentId =
        prevAnnotations.length === 0 ? nextId ?? 1 : Math.max(...prevAnnotations.map(({ id }) => id), 0) + 1

      annotation = {
        ...initalAnnotation,
        id: currentId,
        layer,
        labelPosition,
        lineWidth: annotationInfo?.lineWidth ?? 1.5,
        ...annotationInfo,
      } as T

      return [...prevAnnotations, annotation]
    })

    return annotation
  }

  const selectAnnotation = (annotation: T | null) => {
    setSelectedAnnotation(prevSelectedAnnotation =>
      annotation !== prevSelectedAnnotation ? annotation : prevSelectedAnnotation
    )
  }

  const removeAnnotation = (annotation: T) => {
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

  const updateAnnotation = (annotation: T, patch: Partial<Omit<T, 'id'>>) => {
    if (patch.dataAttrs) {
      validateDataAttrs(patch.dataAttrs)
    }

    const nextAnnotation: T = {
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
