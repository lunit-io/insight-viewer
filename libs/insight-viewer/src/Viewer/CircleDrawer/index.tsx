import React, { ReactElement } from 'react'

import { useOverlayContext } from '../../contexts'

import { getCircleEndPoint } from '../../utils/common/getCircleEndPoint'
import { getCircleRadius } from '../../utils/common/getCircleRadius'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { getCircleConnectingLine } from '../../utils/common/getCircleConnectingLine'
import { calculateCircleArea } from '../../utils/common/calculateCircleArea'

import { circleStyle, textStyle, polyline } from './CircleDrawer.styles'

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

  const drawingRadius = getCircleRadius(centerPointOnCanvas, endPointOnCanvas)

  const textPointOnCanvas = measurement.textPoint
    ? pixelToCanvas(measurement.textPoint)
    : getCircleTextPosition(centerPointOnCanvas, drawingRadius)

  const connectingLine = getCircleConnectingLine([centerPointOnCanvas, endPointOnCanvas], textPointOnCanvas)
    .map((point) => `${point[0]}, ${point[1]}`)
    .join(' ')

  const area = calculateCircleArea(measuredValue)

  return (
    <>
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={circleStyle.outline}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={circleStyle[isSelectedMode ? 'select' : 'default']}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={circleStyle.extendsArea}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <text
        onMouseDown={() => setMeasurementEditMode('textMove')}
        style={{ ...textStyle[isSelectedMode ? 'select' : 'default'] }}
        x={textPointOnCanvas[0]}
        y={textPointOnCanvas[1]}
      >
        {`Area = ${area.toLocaleString(undefined, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })}${unit}2`}
      </text>
      <polyline style={polyline.dashLine} points={connectingLine} />
    </>
  )
}
