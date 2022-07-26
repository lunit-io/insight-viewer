import React, { ReactElement } from 'react'

import { Point } from '../../types'

import { circleStyle, textStyle, polyline } from './CircleDrawer.styles'
import { CircleDrawerProps } from './CircleDrawer.types'

import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { getCircleConnectingLine } from '../../utils/common/getCircleConnectingLine'
import { getCircleCenterAndEndPoint } from '../../utils/common/getCircleCenterAndEndPoint'
import { useOverlayContext } from '../../contexts'

export function CircleDrawer({
  isSelectedMode,
  measurement,
  setMeasurementEditMode,
}: CircleDrawerProps): ReactElement | null {
  const { pixelToCanvas, image } = useOverlayContext()

  const { center, radius, drawingRadius, unit } = measurement

  const points = getCircleCenterAndEndPoint(center, radius, image)
  const canvasPoints = points.map(pixelToCanvas) as [Point, Point]

  const textPoint = measurement.textPoint
    ? pixelToCanvas(measurement.textPoint)
    : getCircleTextPosition(canvasPoints[0], drawingRadius)

  const connectingLine = getCircleConnectingLine(canvasPoints, textPoint)
    .map(point => {
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
        {`radius: ${radius}${unit}`}
      </text>
      <polyline style={polyline.dashLine} points={connectingLine} />
    </>
  )
}
