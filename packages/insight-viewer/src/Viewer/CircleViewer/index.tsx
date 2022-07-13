/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { CircleViewerProps } from './CircleViewer.types'
import { circleStyle } from './CircleViewer.styles'
import { textStyle } from '../MeasurementViewer/MeasurementViewer.styles'

import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { getCircleCenterAndEndPoint } from '../../utils/common/getCircleCenterAndEndPoint'
import { useOverlayContext } from '../../contexts'

export function CircleViewer({ measurement, hoveredMeasurement }: CircleViewerProps): ReactElement {
  const { pixelToCanvas, image } = useOverlayContext()

  const { id, center, radius, textPoint } = measurement

  const points = getCircleCenterAndEndPoint(center, radius, image)
  const [pixelStartPoint, pixelEndPoint] = points.map(pixelToCanvas)

  const drawingRadius = Math.abs(pixelStartPoint[0] - pixelEndPoint[0])

  const [textPointX, textPointY] = textPoint
    ? pixelToCanvas(textPoint)
    : getCircleTextPosition(pixelStartPoint, drawingRadius)

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
