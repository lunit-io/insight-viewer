import { Point } from '../../types'

const MINIMUM_LENGTH = 100

export function isValidLength(line: [Point, Point], minimumLength = MINIMUM_LENGTH): boolean {
  // Calculate the length of a line and verify whether it is shorter than minimum.

  const [startPoint, endPoint] = line

  const x = startPoint[0] - endPoint[0]
  const y = startPoint[1] - endPoint[1]

  const length = Math.sqrt(x ** 2 + y ** 2)

  return length > minimumLength
}
