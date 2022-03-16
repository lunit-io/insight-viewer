import { SVGProps } from 'react'
import {
  Annotation,
  PolygonAnnotation,
  FreeLineAnnotation,
  LineAnnotation,
  Point,
  ArrowLineAnnotation,
} from '../../types'

interface GetPolyViewerInfoProps {
  annotation: PolygonAnnotation | LineAnnotation | FreeLineAnnotation | ArrowLineAnnotation
  selectedAnnotation: Annotation | null
  showOutline: boolean
  pixelToCanvas: (point: Point) => Point
  annotationAttrs?: (annotation: Annotation, showOutline: boolean) => SVGProps<SVGPolygonElement>
}

interface getPolyViewerInfoReturnType {
  isSelectedAnnotation: boolean
  polygonAttributes: SVGProps<SVGPolygonElement> | undefined
  labelPosition: Point | undefined
  polygonPoints: string
  polygonLabel: string | number
}

export function getPolyViewerInfo({
  annotation,
  showOutline,
  selectedAnnotation,
  pixelToCanvas,
  annotationAttrs,
}: GetPolyViewerInfoProps): getPolyViewerInfoReturnType {
  const { label, id, labelPosition: _labelPosition, points } = annotation

  const isSelectedAnnotation = annotation === selectedAnnotation
  const polygonLabel = label ?? id

  const polygonAttributes = typeof annotationAttrs === 'function' ? annotationAttrs(annotation, showOutline) : undefined
  const labelPosition = _labelPosition ? pixelToCanvas(_labelPosition) : undefined

  const polygonPoints: string = points
    .map(point => {
      const [x, y] = pixelToCanvas(point)
      return `${x},${y}`
    })
    .join(' ')

  return {
    isSelectedAnnotation,
    polygonAttributes,
    labelPosition,
    polygonPoints,
    polygonLabel,
  }
}
