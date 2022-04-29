/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { circleStyle, textStyle } from './CircleDrawer.styles'
import { CircleDrawerProps } from './CircleDrawer.types'
import { getCircleRadius } from '../../utils/common/getCircleRadius'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { CIRCLE_TEXT_POSITION_SPACING } from '../../const'
import { useOverlayContext } from '../../contexts'
import { Point } from '../../types'

export function getLineLength(startPoint: Point, endPoint: Point): number {
  const [startX, startY] = startPoint
  const [endX, endY] = endPoint
  const xPow = Math.pow(Math.abs(endX - startX), 2)
  const yPow = Math.pow(Math.abs(endY - startY), 2)

  return Math.sqrt(xPow + yPow)
}

export function CircleDrawer({ points, setMeasurementEditMode }: CircleDrawerProps): ReactElement | null {
  const { image, pixelToCanvas } = useOverlayContext()

  const canvasPoints = points.map(pixelToCanvas)
  const radius = getCircleRadius(points, image)
  const drawingRadius = getLineLength(points[0], points[1])
  const textPosition = getCircleTextPosition(canvasPoints[0], drawingRadius)
  const [cx, cy] = canvasPoints[0]

  return (
    <>
      <circle
        onMouseDown={() => setMeasurementEditMode('line')}
        style={circleStyle.default}
        cx={cx}
        cy={cy}
        r={drawingRadius}
      />
      <text
        style={{ ...textStyle.default }}
        x={textPosition[0] + CIRCLE_TEXT_POSITION_SPACING.x}
        y={textPosition[1] + CIRCLE_TEXT_POSITION_SPACING.y}
      >
        {`radius: ${radius.toFixed(2)}mm`}
      </text>
    </>
  )
}
