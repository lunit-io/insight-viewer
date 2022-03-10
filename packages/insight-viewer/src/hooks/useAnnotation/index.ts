import { useState, useEffect } from 'react'
import polylabel from 'polylabel'
import { Annotation, Point, AnnotationMode } from '../../types'
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
  addAnnotation: (polygon: Point[], annotationInfo?: Omit<T, 'id' | 'polygon'>) => T | null
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
                labelPosition: polylabel([addedAnnotation.polygon], 1),
              } as T)
          )
        : []
    )
  }, [initalAnnotation, nextId])

  const addAnnotation = (
    polygon: Point[],
    annotationInfo: Partial<Omit<T, 'id' | 'polygon'>> | undefined
  ): T | null => {
    if (mode === 'polygon' && (!getIsPolygonAreaGreaterThanArea(polygon) || getIsComplexPolygon(polygon))) return null
    if (mode === 'freeLine' && !getIsPolygonAreaGreaterThanArea(polygon)) return null
    if (mode === 'line' && !isValidLength(polygon)) return null
    if (mode === 'circle' && polygon.length < 2) return null
    if (annotationInfo?.dataAttrs) {
      validateDataAttrs(annotationInfo?.dataAttrs)
    }

    let annotation: T | null = null

    setAnnotations(prevAnnotations => {
      const labelPosition = polylabel([polygon], 1)
      const currentId =
        prevAnnotations.length === 0 ? nextId ?? 1 : Math.max(...prevAnnotations.map(({ id }) => id), 0) + 1

      annotation = {
        ...initalAnnotation,
        id: currentId,
        polygon,
        labelPosition,
        lineWidth: annotationInfo?.lineWidth ?? 1.5,
        ...annotationInfo,
      } as T

      return [...prevAnnotations, annotation]
    })

    return annotation
  }

  const selectAnnotation = (annotation: T | null) => {
    setSelectedAnnotation(prevSelectedAnnotatio =>
      annotation !== prevSelectedAnnotatio ? annotation : prevSelectedAnnotatio
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

        setSelectedAnnotation(prevSelectedAnnotatio =>
          annotation === prevSelectedAnnotatio ? nextAnnotation : prevSelectedAnnotatio
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
