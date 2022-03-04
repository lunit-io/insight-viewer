import React, { ReactElement } from 'react'

import { useOverlayContext } from '../../contexts'
import { LineDrawerProps } from './LineDrawer.types'
import { polyline } from '../AnnotationDrawer/AnnotationDrawer.styles'

const ARROW_LENGTH = 60
const ARROW_CENTER_POSITION = -10 // this number must be negative
const ARROW_DEGREE = 0.7 // this number range is 0.5 ~ 1

export function LineDrawer({ line }: LineDrawerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  if (line.length === 2) {
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

    line.splice(
      1,
      0,
      [centerX, centerY],
      [rightArrowVertexX, rightArrowVertexY],
      tail,
      [leftArrowVertexX, leftArrowVertexY],
      [centerX, centerY]
    )
  }

  const linePoints = line
    .map(point => {
      const [x, y] = pixelToCanvas(point)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <>
      {line && line.length > 0 && (
        <>
          <polyline style={polyline.default} points={linePoints} />
          <polyline style={polyline.highlight} points={linePoints} />
        </>
      )}
    </>
  )
}
