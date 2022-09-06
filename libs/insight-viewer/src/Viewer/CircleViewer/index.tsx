import React, { ReactElement } from 'react'

import { textStyle, viewerStyle } from '../Viewer.styles'

import { useOverlayContext } from '../../contexts'

import { calculateCircleArea } from '../../utils/common/calculateCircleArea'
import { getCircleRadius } from '../../utils/common/getCircleRadius'
import { getCircleEndPoint } from '../../utils/common/getCircleEndPoint'
import { getCircleConnectingLine } from '../../utils/common/getCircleConnectingLine'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'

import type { CircleViewerProps } from './CircleViewer.types'

export function CircleViewer({ measurement, hoveredMeasurement }: CircleViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const { centerPoint, radius, measuredValue, unit } = measurement

  const endPoint = getCircleEndPoint(centerPoint, radius)

  const [centerPointOnCanvas, endPointOnCanvas] = [centerPoint, endPoint].map(pixelToCanvas)

  const drawingRadius = getCircleRadius(centerPointOnCanvas, endPointOnCanvas)

  const textPointOnCanvas = measurement.textPoint
    ? pixelToCanvas(measurement.textPoint)
    : getCircleTextPosition(centerPointOnCanvas, drawingRadius)

  const connectingLine = getCircleConnectingLine([centerPointOnCanvas, endPointOnCanvas], textPointOnCanvas)
    .map((point) => `${point[0]}, ${point[1]}`)
    .join(' ')

  const area = calculateCircleArea(measuredValue)

  const isHoveredMeasurement = measurement === hoveredMeasurement

  return (
    <>
      <circle
        style={{
          ...viewerStyle[isHoveredMeasurement ? 'hoveredOutline' : 'outline'],
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        style={{
          ...viewerStyle.extendsArea,
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        style={{
          ...viewerStyle.default,
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <text
        style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }}
        x={textPointOnCanvas[0]}
        y={textPointOnCanvas[1]}
      >
        {`Area = ${area.toLocaleString(undefined, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })}${unit}2`}
      </text>
      <polyline style={viewerStyle.dashLine} points={connectingLine} />
    </>
  )
}
