import { Point } from '../../types'

const minimumArea = 100

export function getIsPolygonAreaGreaterThanArea(
  polygon: Point[],
  greaterThanArea = minimumArea
): boolean {
  // https://stackoverflow.com/questions/16285134/calculating-polygon-area
  // Calculate the area of a polygon and verify if it is greater than or equal to the minimum area

  let total = 0

  for (let i = 0, l = polygon.length; i < l; i += 1) {
    const addX = polygon[i][0]
    const addY = polygon[i === polygon.length - 1 ? 0 : i + 1][1]
    const subX = polygon[i === polygon.length - 1 ? 0 : i + 1][0]
    const subY = polygon[i][1]

    total += addX * addY * 0.5
    total -= subX * subY * 0.5
  }

  return Math.abs(total) > greaterThanArea
}
