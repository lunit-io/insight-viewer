import { Annotation, PolygonAnnotation, FreeLineAnnotation, LineAnnotation, Point } from '../../types'
import { getArrowPosition } from './getArrowPosition'

export interface GetPolyViewerInfoProps {
  annotation: PolygonAnnotation | LineAnnotation | FreeLineAnnotation
  hoveredAnnotation: Annotation | null
  showOutline: boolean
  pixelToCanvas: (point: Point) => Point
}

interface getPolyViewerInfoReturnType {
  isHoveredAnnotation: boolean
  labelPosition: Point | undefined
  polygonPoints: string
  headPoints: string | null
  polygonLabel: string | number
}

export function getPolyViewerInfo({
  annotation,
  showOutline,
  hoveredAnnotation,
  pixelToCanvas,
}: GetPolyViewerInfoProps): getPolyViewerInfoReturnType {
  const { label, id, labelPosition: _labelPosition, points } = annotation

  const isHoveredAnnotation = annotation === hoveredAnnotation
  const polygonLabel = label ?? id

  const labelPosition = _labelPosition ? pixelToCanvas(_labelPosition) : undefined

  const canvasPoints = points.map(pixelToCanvas)

  const polygonPoints: string = points
    .map((point) => {
      const [x, y] = pixelToCanvas(point)
      return `${x},${y}`
    })
    .join(' ')

  const headPoints: string | null =
    annotation.type === 'line' && annotation.hasArrowHead
      ? getArrowPosition(canvasPoints)
          .map((point) => {
            const [x, y] = point
            return `${x},${y}`
          })
          .join()
      : null

  return {
    isHoveredAnnotation,
    labelPosition,
    headPoints,
    polygonPoints,
    polygonLabel,
  }
}
