import type { Point } from '../../../types'

const ARROW_LENGTH = 5.5
const ARROW_CENTER_POSITION = -5 // this number must be negative
const ARROW_DEGREE = 0.85 // this number range is 0.5 ~ 1

export function getArrowPosition(line: Point[]): Point[] {
  if (line.length !== 2) {
    return []
  }

  const [tail, head] = line

  const angle = Math.atan2(tail[1] - head[1], tail[0] - head[0])

  const centerX = ARROW_CENTER_POSITION * Math.cos(angle) + tail[0]
  const centerY = ARROW_CENTER_POSITION * Math.sin(angle) + tail[1]

  const rightAngle = angle + ARROW_DEGREE * Math.PI
  const rightArrowVertexX = ARROW_LENGTH * Math.cos(rightAngle) + tail[0]
  const rightArrowVertexY = ARROW_LENGTH * Math.sin(rightAngle) + tail[1]

  const leftAngle = angle - ARROW_DEGREE * Math.PI
  const leftArrowVertexX = ARROW_LENGTH * Math.cos(leftAngle) + tail[0]
  const leftArrowVertexY = ARROW_LENGTH * Math.sin(leftAngle) + tail[1]

  return [
    [centerX, centerY],
    [rightArrowVertexX, rightArrowVertexY],
    tail,
    [leftArrowVertexX, leftArrowVertexY],
    [centerX, centerY],
  ]
}
