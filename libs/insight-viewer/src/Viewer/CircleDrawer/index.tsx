import React, { ReactElement } from 'react'

import { useOverlayContext } from '../../contexts'

import { getCircleEndPoint } from '../../utils/common/getCircleEndPoint'
import { getCircleRadiusByCenter } from '../../utils/common/getCircleRadius'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { getCircleConnectingLine } from '../../utils/common/getCircleConnectingLine'
import { calculateCircleArea } from '../../utils/common/calculateCircleArea'

import { svgWrapperStyle, textStyle } from '../Viewer.styles'

import type { CircleDrawerProps } from './CircleDrawer.types'

export function CircleDrawer({
  isSelectedMode,
  measurement,
  setMeasurementEditMode,
}: CircleDrawerProps): ReactElement | null {
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

  const handleMoveOnMouseDown = () => setMeasurementEditMode('move')
  const handleTextMoveOnMouseDown = () => setMeasurementEditMode('textMove')

  return (
    <>
      <circle
        className="measurement-circle pointer"
        onMouseDown={handleMoveOnMouseDown}
        style={svgWrapperStyle.outline}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        className="measurement-circle pointer"
        onMouseDown={handleMoveOnMouseDown}
        style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        className="measurement-circle pointer drag"
        onMouseDown={handleMoveOnMouseDown}
        style={{ ...svgWrapperStyle[isSelectedMode ? 'selectedExtendsArea' : 'extendsArea'] }}
      />
      <text
        className="measurement-circle label pointer"
        onMouseDown={handleTextMoveOnMouseDown}
        style={{ ...textStyle[isSelectedMode ? 'select' : 'default'] }}
        x={textPointOnCanvas[0]}
        y={textPointOnCanvas[1]}
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
