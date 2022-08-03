/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { getCircleTextPosition } from 'utils/common/getCircleTextPosition'
import { getCircleConnectingLine } from 'utils/common/getCircleConnectingLine'
import { getCircleCenterAndEndPoint } from 'utils/common/getCircleCenterAndEndPoint'
import { useOverlayContext } from 'contexts'
import { CircleViewerProps } from './CircleViewer.types'
import { circleStyle } from './CircleViewer.styles'
import { textStyle, polylineStyle } from '../MeasurementViewer/MeasurementViewer.styles'

export function CircleViewer({ measurement, hoveredMeasurement }: CircleViewerProps): ReactElement {
  const { pixelToCanvas, image } = useOverlayContext()

  const { id, center, radius, unit } = measurement

  const points = getCircleCenterAndEndPoint(center, radius, image)
  const [pixelStartPoint, pixelEndPoint] = points.map(pixelToCanvas)
  const drawingRadius = Math.abs(pixelStartPoint[0] - pixelEndPoint[0])

  const textPoint = measurement.textPoint
    ? pixelToCanvas(measurement.textPoint)
    : getCircleTextPosition(pixelStartPoint, drawingRadius)

  const connectingLine = getCircleConnectingLine([pixelStartPoint, pixelEndPoint], textPoint)
    .map(point => {
      const [x, y] = point

      return `${x},${y}`
    })
    .join(' ')

  const isHoveredMeasurement = measurement === hoveredMeasurement
  const [cx, cy] = pixelStartPoint

  return (
    <>
      <circle
        data-cy-id={id}
        style={{
          ...circleStyle[isHoveredMeasurement ? 'hoveredOutline' : 'outline'],
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={cx}
        cy={cy}
        r={drawingRadius}
      />
      <circle
        data-cy-id={id}
        style={{
          ...circleStyle.default,
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={cx}
        cy={cy}
        r={drawingRadius}
      />
      <text style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }} x={textPoint[0]} y={textPoint[1]}>
        {`radius: ${radius.toFixed(1)}${unit}`}
      </text>
      <polyline style={polylineStyle.dashLine} points={connectingLine} />
    </>
  )
}
