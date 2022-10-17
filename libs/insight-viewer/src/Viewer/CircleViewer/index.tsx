import React, { ReactElement } from 'react'

import { textStyle, svgWrapperStyle } from '../Viewer.styles'

import { useOverlayContext } from '../../contexts'

import { calculateCircleArea } from '../../utils/common/calculateCircleArea'
import { getCircleRadiusByCenter } from '../../utils/common/getCircleRadius'
import { getCircleEndPoint } from '../../utils/common/getCircleEndPoint'
import { getCircleConnectingLine } from '../../utils/common/getCircleConnectingLine'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'

import type { CircleViewerProps } from './CircleViewer.types'

export function CircleViewer({ measurement, hoveredMeasurement }: CircleViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const { centerPoint, radius, measuredValue, unit } = measurement

  const endPoint = getCircleEndPoint(centerPoint, radius)
  const [centerPointOnCanvas, endPointOnCanvas] = [centerPoint, endPoint].map(pixelToCanvas)

  const drawingRadius = getCircleRadiusByCenter(centerPointOnCanvas, endPointOnCanvas)

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
        className="measurement-circle pointer"
        style={{
          ...svgWrapperStyle[isHoveredMeasurement ? 'hoveredOutline' : 'outline'],
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        className="measurement-circle pointer"
        style={{
          ...svgWrapperStyle.extendsArea,
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        className="measurement-circle pointer"
        style={{
          ...svgWrapperStyle.default,
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <polyline style={{ ...svgWrapperStyle.dashLine, visibility }} points={connectingLine} />
      <text
        className="measurement-circle label pointer"
        ref={ref}
        style={{
          ...textStyle[isHoveredMeasurement ? 'hover' : 'default'],
          visibility,
        }}
        x={textBoxPoint[0]}
        y={textBoxPoint[1]}
      >
        {`Area = ${area.toLocaleString(undefined, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })}${unit}2`}
      </text>
      <polyline style={svgWrapperStyle.dashLine} points={connectingLine} />
    </>
  )
}
