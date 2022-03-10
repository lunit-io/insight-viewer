import { Point } from '../../types'

const MINIMUM_LENGTH = 100

export function isValidLength(line: Point[], minimumLength = MINIMUM_LENGTH): boolean {
  // Calculate the length of a line and verify whether it is shorter than minimum.

  if (line.length === 1) return false

  const startPoint = line[0]
  const endPoint = line[line.length - 1]

  const x = startPoint[0] - endPoint[0]
  const y = startPoint[1] - endPoint[1]

  const length = Math.sqrt(x ** 2 + y ** 2)

  return length > minimumLength
}
