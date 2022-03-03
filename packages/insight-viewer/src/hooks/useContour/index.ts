import { useState, useEffect } from 'react'
import polylabel from 'polylabel'
import { Contour, Point, AnnotationMode } from '../../types'
import { getIsPolygonAreaGreaterThanArea } from '../../utils/common/getIsPolygonAreaGreaterThanArea'
import { getIsComplexPolygon } from '../../utils/common/getIsComplexPolygon'
import { isValidLength } from '../../utils/common/isValidLength'

function validateDataAttrs(dataAttrs?: { [attr: string]: string }) {
  if (!dataAttrs) return

  Object.keys(dataAttrs).forEach(attr => {
    if (!/^data-/.test(attr)) {
      throw new Error(`Contour.dataAttrs 속성은 data-* 형태의 이름으로 입력되어야 합니다 (${attr})`)
    }
  })
}

interface UseContourProps<T extends Contour> {
  nextId?: number
  initalContours?: Omit<T, 'id'>[]
  mode?: AnnotationMode
}

interface ContourDrawingState<T extends Contour> {
  contours: T[]
  focusedContour: T | null
  addContour: (polygon: Point[], contourInfo?: Omit<T, 'id' | 'polygon'>) => T | null
  focusContour: (contour: T | null) => void
  updateContour: (contour: T, patch: Partial<T>) => void
  removeContour: (contour: T) => void
  removeAllContours: () => void
}

export function useContour<T extends Contour>({
  nextId,
  initalContours,
  mode = 'polygon',
}: UseContourProps<T>): ContourDrawingState<T> {
  const [contours, setContours] = useState<T[]>([])
  const [focusedContour, setFocusedContour] = useState<T | null>(null)

  useEffect(() => {
    setContours(() =>
      initalContours
        ? initalContours.map<T>(
            (addedContour, i) =>
              ({
                ...addedContour,
                id: nextId ?? i,
                labelPosition: polylabel([addedContour.polygon], 1),
              } as T)
          )
        : []
    )
  }, [initalContours, nextId])

  const addContour = (polygon: Point[], contourInfo: Partial<Omit<T, 'id' | 'polygon'>> | undefined): T | null => {
    if (mode === 'polygon' && (!getIsPolygonAreaGreaterThanArea(polygon) || getIsComplexPolygon(polygon))) return null
    if (mode === 'freeLine' && !getIsPolygonAreaGreaterThanArea(polygon)) return null
    if (mode === 'line' && !isValidLength(polygon)) return null
    if (mode === 'circle' && polygon.length < 2) return null
    if (contourInfo?.dataAttrs) {
      validateDataAttrs(contourInfo?.dataAttrs)
    }

    let contour: T | null = null

    setContours(prevContours => {
      const labelPosition = polylabel([polygon], 1)
      const currentId = prevContours.length === 0 ? nextId ?? 1 : Math.max(...prevContours.map(({ id }) => id), 0) + 1

      contour = {
        ...initalContours,
        id: currentId,
        polygon,
        labelPosition,
        lineWidth: contourInfo?.lineWidth ?? 1.5,
        ...contourInfo,
      } as T

      return [...prevContours, contour]
    })

    return contour
  }

  const focusContour = (contour: T | null) => {
    setFocusedContour(prevFocusedContour => (contour !== prevFocusedContour ? contour : prevFocusedContour))
  }

  const removeContour = (contour: T) => {
    setContours(prevContour => {
      const index = prevContour.findIndex(({ id }) => id === contour.id)

      if (index > -1) {
        const nextContours = [...prevContour]
        nextContours.splice(index, 1)

        return nextContours
      }

      return prevContour
    })

    setFocusedContour(null)
  }

  const updateContour = (contour: T, patch: Partial<Omit<T, 'id'>>) => {
    if (patch.dataAttrs) {
      validateDataAttrs(patch.dataAttrs)
    }

    const nextContour: T = {
      ...contour,
      ...patch,
      id: contour.id,
    }

    setContours(prevContours => {
      const nextContours = [...prevContours]
      const index: number = nextContours.findIndex(({ id }) => nextContour.id === id)

      if (index > -1) {
        nextContours[index] = nextContour

        setFocusedContour(prevFocusedContour => (contour === prevFocusedContour ? nextContour : prevFocusedContour))
      }

      return nextContours
    })

    return nextContour
  }

  const removeAllContours = () => {
    setContours([])
    setFocusedContour(null)
  }

  return {
    contours,
    focusedContour,
    addContour,
    removeContour,
    updateContour,
    focusContour,
    removeAllContours,
  }
}
