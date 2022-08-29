import React, { ReactElement } from 'react'

import { circleStyle, textStyle, polyline } from './CircleDrawer.styles'
import { CircleDrawerProps } from './CircleDrawer.types'

import { useOverlayContext } from '../../contexts'

import { getLineLengthWithoutImage } from '../../utils/common/getLineLengthWithoutImage'
import { getCircleCenterAndEndPoint } from '../../utils/common/getCircleCenterAndEndPoint'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { getCircleConnectingLine } from '../../utils/common/getCircleConnectingLine'
import { calculateCircleArea } from '../../utils/common/calculateCircleArea'

import type { Point } from '../../types'

export function CircleDrawer({
  isSelectedMode,
  measurement,
  setMeasurementEditMode,
}: CircleDrawerProps): ReactElement | null {
  const { pixelToCanvas, image } = useOverlayContext()

  const { centerPoint, measuredValue, radius, unit } = measurement
  const area = calculateCircleArea(measuredValue)
  const points = getCircleCenterAndEndPoint(centerPoint, radius, image)
  const canvasPoints = points.map(pixelToCanvas) as [Point, Point]
  const drawingRadius = getLineLengthWithoutImage(canvasPoints[0], canvasPoints[1])

  const textPoint = measurement.textPoint
    ? pixelToCanvas(measurement.textPoint)
    : getCircleTextPosition(canvasPoints[0], drawingRadius)

  const connectingLine = getCircleConnectingLine(canvasPoints, textPoint)
    .map((point) => {
      const [x, y] = point

      return `${x},${y}`
    })
    .join(' ')

  const [cx, cy] = canvasPoints[0]

  return (
    <>
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={circleStyle.outline}
        cx={cx}
        cy={cy}
        r={drawingRadius}
      />
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={circleStyle[isSelectedMode ? 'select' : 'default']}
        cx={cx}
        cy={cy}
        r={drawingRadius}
      />
      <text
        onMouseDown={() => setMeasurementEditMode('textMove')}
        style={{ ...textStyle[isSelectedMode ? 'select' : 'default'] }}
        x={textPoint[0]}
        y={textPoint[1]}
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
