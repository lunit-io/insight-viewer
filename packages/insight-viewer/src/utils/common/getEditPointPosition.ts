/* eslint-disable no-restricted-properties */
import { Point, Annotation, Measurement } from 'types'
import { getCircleEditPoints } from './getCircleEditPoints'
import { getLineLengthWithoutImage } from './getLineLengthWithoutImage'

export type EditPoints = [number, number, number, number]

export function getEditPointPosition(points: Point[], editTarget: Annotation | null): EditPoints | null

export function getEditPointPosition(points: Point[], editTarget: Measurement | null): EditPoints | null

export function getEditPointPosition(points: Point[], editTarget: Measurement | Annotation | null): EditPoints | null {
  // if there's more than 2 points, it cannot edit(can just move)
  if (points.length !== 2) return null

  const startPoint = points[0]
  const endPoint = points[1]

  if (editTarget && editTarget.type === 'circle') {
    const radius = getLineLengthWithoutImage(points[0], points[1])
    const editPoints = getCircleEditPoints(startPoint, radius)

    return editPoints
  }

  // line annotation or ruler measurement
  return [startPoint[0], startPoint[1], endPoint[0], endPoint[1]]
}
