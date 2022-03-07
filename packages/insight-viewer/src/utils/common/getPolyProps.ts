import { SVGProps } from 'react'
import { Annotation, Point } from '../../types'

interface GetPolyViewerInfoProps<T extends Annotation> {
  annotation: T
  focusedAnnotation: T | null
  showOutline: boolean
  pixelToCanvas: (point: Point) => Point
  annotationAttrs?: (annotation: Annotation, showOutline: boolean) => SVGProps<SVGPolygonElement>
}

interface getPolyViewerInfoReturnType {
  isFocusedPolygon: boolean
  polygonAttributes: SVGProps<SVGPolygonElement> | undefined
  labelPosition: Point | undefined
  polygonPoints: string
  polygonLabel: string | number
}

export function getPolyViewerInfo<T extends Annotation>({
  annotation,
  showOutline,
  focusedAnnotation,
  pixelToCanvas,
  annotationAttrs,
}: GetPolyViewerInfoProps<T>): getPolyViewerInfoReturnType {
  const { polygon, label, id, labelPosition: _labelPosition } = annotation
  const isFocusedPolygon = polygon === focusedAnnotation?.polygon
  const polygonLabel = label ?? id

  const polygonAttributes = typeof annotationAttrs === 'function' ? annotationAttrs(annotation, showOutline) : undefined

  const labelPosition = _labelPosition ? pixelToCanvas(_labelPosition) : undefined

  const polygonPoints: string = polygon
    .map(point => {
      const [x, y] = pixelToCanvas(point)
      return `${x},${y}`
    })
    .join(' ')

  return {
    isFocusedPolygon,
    polygonAttributes,
    labelPosition,
    polygonPoints,
    polygonLabel,
  }
}
