/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { CircleViewerProps } from './CircleViewer.types'
import { circleStyle, textStyle } from './CircleViewer.styles'
import { CIRCLE_TEXT_POSITION_SPACING } from '../../const'
import { calculateDistance } from '../../utils/common/calculateDistance'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { useOverlayContext } from '../../contexts'
import { Point } from '../../types'

export function CircleViewer({ measurement, hoveredMeasurement }: CircleViewerProps): ReactElement {
  const { pixelToCanvas, image } = useOverlayContext()

  const { id, center, radius } = measurement
  const calculatedDistance = calculateDistance(radius, image)
  const endPoint: Point = [center[0] + (calculatedDistance ?? 0), center[1]]
  const points: [Point, Point] = [center, endPoint]

  const [pixelStartPoint, pixelEndPoint] = points.map(pixelToCanvas)
  const drawingRadius = Math.abs(pixelStartPoint[0] - pixelEndPoint[0])
  const textPosition = getCircleTextPosition(pixelToCanvas(center), drawingRadius)

  const isHoveredMeasurement = measurement === hoveredMeasurement
  const [cx, cy] = pixelStartPoint

  return (
    <>
      <circle
        data-cy-id={id}
        style={{
          ...circleStyle[isHoveredMeasurement ? 'hover' : 'default'],
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={cx}
        cy={cy}
        r={drawingRadius}
      />
      <text
        style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }}
        x={textPosition[0] + CIRCLE_TEXT_POSITION_SPACING.x}
        y={textPosition[1] + CIRCLE_TEXT_POSITION_SPACING.y}
      >
        {`radius: ${radius.toFixed(2)}mm`}
      </text>
    </>
  )
}
