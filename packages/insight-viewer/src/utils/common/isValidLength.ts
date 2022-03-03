import { Point } from '../../types'

const MINIMUM_LENGTH = 100

export function isValidLength(line: Point[], minimumLength = MINIMUM_LENGTH): boolean {
  // Calculate the length of a line and verify whether it is shorter than minimum.

  if (line.length === 1) return false

  const [firstPoint, secondPoint] = line

  const x = firstPoint[0] - secondPoint[0]
  const y = firstPoint[1] - secondPoint[1]

  const length = Math.sqrt(x ** 2 + y ** 2)

  return length > minimumLength
}
