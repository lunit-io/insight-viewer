import { getCircleEditPoints } from '../../utils/common/getCircleEditPoints'

import type { Point, DrawableAnnotation } from '../types'

interface GetEditPointPositionParams {
  editingPoints: [Point, Point] | null
  annotation: DrawableAnnotation | null
  isDefaultEditPointsOfAnnotation: boolean
}

export function getEditPointPosition({
  annotation,
  editingPoints,
  isDefaultEditPointsOfAnnotation,
}: GetEditPointPositionParams): [Point, Point] | null {
  // Polygon, free line annotation does not show edit point.
  if (!annotation || annotation.type === 'polygon' || annotation.type === 'freeLine') return null

  if (isDefaultEditPointsOfAnnotation) {
    if (annotation.type === 'area') {
      const editPoints = getCircleEditPoints(annotation.drawingCenter, annotation.drawingRadius)
      return editPoints
    }

    return annotation.drawingPoints
  }

  return editingPoints
}
