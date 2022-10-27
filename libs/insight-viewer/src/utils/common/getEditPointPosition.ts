// import { getCircleEditPoints } from './getCircleEditPoints'
// import { getCircleRadiusByCenter } from '../../utils/common/getCircleRadius'

// import type { Point, Annotation, Measurement } from '../../types'

// export type EditPoints = [startX: number, startY: number, endX: number, endY: number]

// export function getEditPointPosition(points: Point[], editTarget: Measurement | Annotation | null): EditPoints | null {
//   // if there's more than 2 points, it cannot edit(can just move)
//   if (points.length !== 2) return null

//   if (editTarget && editTarget.type === 'circle') {
//     const [centerPoint, endPoint] = points
//     const radius = getCircleRadiusByCenter(centerPoint, endPoint)
//     const editPoints = getCircleEditPoints(centerPoint, radius)
//     return editPoints
//   }

//   // line annotation or ruler measurement
//   const [startPoint, endPoint] = points

//   return [startPoint[0], startPoint[1], endPoint[0], endPoint[1]]
// }

import { getCircleEditPoints } from './getCircleEditPoints'
import { getCircleRadiusByCenter } from '../../utils/common/getCircleRadius'
import type { Point, Annotation, Measurement } from '../../types'
export type EditPoints = [startX: number, startY: number, endX: number, endY: number]
export function getEditPointPosition(
  points: Point[],
  editTarget: Measurement | Annotation | null,
  drawingMode?: 'circle' | 'ruler'
): EditPoints | null {
  // if there's more than 2 points, it cannot edit(can just move)
  if (points.length !== 2) return null
  /**
   * TODO
   * drawingMode prop and below code should be deleted if the circle's edit method is changed
   * when drawing but isn't editing: editTarget === null && drawingMode === 'circle'
   */
  if (editTarget === null && drawingMode === 'circle') {
    return null
  }
  if (editTarget && editTarget.type === 'circle') {
    const [centerPoint, endPoint] = points
    const radius = getCircleRadiusByCenter(centerPoint, endPoint)
    const editPoints = getCircleEditPoints(centerPoint, radius)
    return editPoints
  }
  // line annotation or ruler measurement
  const [startPoint, endPoint] = points
  return [startPoint[0], startPoint[1], endPoint[0], endPoint[1]]
}
