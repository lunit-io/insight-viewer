/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { circleStyle } from './CircleViewer.styles'
import { textStyle, polylineStyle } from '../MeasurementViewer/MeasurementViewer.styles'

import { useOverlayContext } from '../../contexts'

import { calculateCircleArea } from '../../utils/common/calculateCircleArea'
import { getCircleCenterAndEndPoint } from '../../utils/common/getCircleCenterAndEndPoint'
import { getCircleConnectingLine } from '../../utils/common/getCircleConnectingLine'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'

import type { CircleViewerProps } from './CircleViewer.types'

export function CircleViewer({ measurement, hoveredMeasurement }: CircleViewerProps): ReactElement {
  const { pixelToCanvas, image } = useOverlayContext()

  const { centerPoint, radius, measuredValue, unit } = measurement

  const area = calculateCircleArea(measuredValue)

  const points = getCircleCenterAndEndPoint(centerPoint, radius, image)
  const [pixelStartPoint, pixelEndPoint] = points.map(pixelToCanvas)

  const drawingRadius = Math.abs(pixelStartPoint[0] - pixelEndPoint[0])

  const textPoint = measurement.textPoint
    ? pixelToCanvas(measurement.textPoint)
    : getCircleTextPosition(pixelStartPoint, drawingRadius)

  const connectingLine = getCircleConnectingLine([pixelStartPoint, pixelEndPoint], textPoint)
    .map((point) => {
      const [x, y] = point

      return `${x},${y}`
    })
    .join(' ')

  const isHoveredMeasurement = measurement === hoveredMeasurement
  const [cx, cy] = pixelStartPoint

  return (
    <>
      <circle
        style={{
          ...circleStyle[isHoveredMeasurement ? 'hoveredOutline' : 'outline'],
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={cx}
        cy={cy}
        r={drawingRadius}
      />
      <circle
        style={{
          ...circleStyle.default,
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={cx}
        cy={cy}
        r={drawingRadius}
      />
      <text style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }} x={textPoint[0]} y={textPoint[1]}>
        {`Area = ${area.toLocaleString(undefined, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })}${unit}2`}
      </text>
      <polyline style={polylineStyle.dashLine} points={connectingLine} />
    </>
  )
}
