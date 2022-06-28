/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { CircleViewerProps } from './CircleViewer.types'
import { circleStyle } from './CircleViewer.styles'
import { textStyle } from '../MeasurementViewer/MeasurementViewer.styles'

import { calculateDistance } from '../../utils/common/calculateDistance'
import { useOverlayContext } from '../../contexts'
import { Point } from '../../types'

export function CircleViewer({ measurement, hoveredMeasurement }: CircleViewerProps): ReactElement {
  const { pixelToCanvas, image } = useOverlayContext()

  const { id, center, radius, textPoint } = measurement
  const calculatedDistance = calculateDistance(radius, image)
  const endPoint: Point = [center[0] + (calculatedDistance ?? 0), center[1]]
  const points: [Point, Point] = [center, endPoint]

  const [pixelStartPoint, pixelEndPoint] = points.map(pixelToCanvas)
  const [textPointX, textPointY] = pixelToCanvas(textPoint)
  const drawingRadius = Math.abs(pixelStartPoint[0] - pixelEndPoint[0])

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
      <text style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }} x={textPointX} y={textPointY}>
        {`radius: ${radius.toFixed(2)}mm`}
      </text>
    </>
  )
}
