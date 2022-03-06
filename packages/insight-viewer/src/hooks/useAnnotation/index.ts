import { useState, useEffect } from 'react'
import polylabel from 'polylabel'
import { Contour, Point, AnnotationMode } from '../../types'
import { getIsPolygonAreaGreaterThanArea } from '../../utils/common/getIsPolygonAreaGreaterThanArea'
import { getIsComplexPolygon } from '../../utils/common/getIsComplexPolygon'

function validateDataAttrs(dataAttrs?: { [attr: string]: string }) {
  if (!dataAttrs) return

  Object.keys(dataAttrs).forEach(attr => {
    if (!/^data-/.test(attr)) {
      throw new Error(`Contour.dataAttrs 속성은 data-* 형태의 이름으로 입력되어야 합니다 (${attr})`)
    }
  })
}

interface UseAnnotationProps<T extends Contour> {
  nextId?: number
  initalAnnotation?: Omit<T, 'id'>[]
  mode?: AnnotationMode
}

interface AnnotationDrawingState<T extends Contour> {
  annotations: T[]
  focusedAnnotation: T | null
  addAnnotation: (polygon: Point[], annotationInfo?: Omit<T, 'id' | 'polygon'>) => T | null
  focusAnnotation: (annotation: T | null) => void
  updateAnnotation: (annotation: T, patch: Partial<T>) => void
  removeAnnotation: (annotation: T) => void
  removeAllAnnotation: () => void
}

export function useAnnotation<T extends Contour>({
  nextId,
  initalAnnotation,
  mode = 'polygon',
}: UseAnnotationProps<T>): AnnotationDrawingState<T> {
  const [annotations, setAnnotations] = useState<T[]>([])
  const [focusedAnnotation, setFocusedAnnotation] = useState<T | null>(null)

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

  const focusAnnotation = (annotation: T | null) => {
    setFocusedAnnotation(prevFocusedAnnotation =>
      annotation !== prevFocusedAnnotation ? annotation : prevFocusedAnnotation
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

    setFocusedAnnotation(null)
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

        setFocusedAnnotation(prevFocusedAnnotation =>
          annotation === prevFocusedAnnotation ? nextAnnotation : prevFocusedAnnotation
        )
      }

      return nextAnnotations
    })

    return nextAnnotation
  }

  const removeAllAnnotation = () => {
    setAnnotations([])
    setFocusedAnnotation(null)
  }

  return {
    annotations,
    focusedAnnotation,
    addAnnotation,
    removeAnnotation,
    updateAnnotation,
    focusAnnotation,
    removeAllAnnotation,
  }
}
