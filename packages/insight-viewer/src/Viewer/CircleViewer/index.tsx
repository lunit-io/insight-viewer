import React, { ReactElement } from 'react'

import { CircleViewerProps } from './CircleViewer.types'
import { circleStyle, textStyle } from './CircleViewer.styles'
import { CIRCLE_TEXT_POSITION_SPACING } from '../../const'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { useOverlayContext } from '../../contexts'
import { Point } from '../../types'

export function CircleViewer({ measurement, hoveredMeasurement }: CircleViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const { id, center, radius } = measurement
  const endPoint: Point = [center[0] + radius, center[1]]
  const points: [Point, Point] = [center, endPoint]

  const canvasPoints = points.map(pixelToCanvas)
  const drawingRadius = Math.abs(canvasPoints[0][0] - canvasPoints[1][0])
  const textPosition = getCircleTextPosition(pixelToCanvas(center), drawingRadius)

  const isHoveredMeasurement = measurement === hoveredMeasurement
  const [cx, cy] = canvasPoints[0]

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
