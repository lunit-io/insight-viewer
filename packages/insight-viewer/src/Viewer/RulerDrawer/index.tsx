import React, { ReactElement } from 'react'

import { Point } from '../../types'

import { RulerDrawerProps } from './RulerDrawer.types'
import { polyline, textStyle } from './RulerDrawer.styles'

import { getRulerTextPosition } from '../../utils/common/getRulerTextPosition'
import { getRulerConnectingLine } from '../../utils/common/getRulerConnectingLine'
import { useOverlayContext } from '../../contexts'

export function RulerDrawer({
  measurement,
  isSelectedMode,
  setMeasurementEditMode,
}: RulerDrawerProps): ReactElement | null {
  const { pixelToCanvas } = useOverlayContext()

  const { points, linePoints, length, unit } = measurement

  const canvasPoints = points.map(pixelToCanvas) as [Point, Point]
  const textPoint = pixelToCanvas(measurement.textPoint ?? getRulerTextPosition(points[1]))
  const connectingLine = getRulerConnectingLine(canvasPoints, textPoint)
    .map(point => {
      const [x, y] = point

      return `${x},${y}`
    })
    .join(' ')

  return (
    <>
      <polyline onMouseDown={() => setMeasurementEditMode('move')} style={polyline.outline} points={linePoints} />
      <polyline
        data-cy-move
        onMouseDown={() => setMeasurementEditMode('move')}
        style={polyline[isSelectedMode ? 'select' : 'default']}
        points={linePoints}
      />
      <text
        onMouseDown={() => setMeasurementEditMode('textMove')}
        style={{ ...textStyle[isSelectedMode ? 'select' : 'default'] }}
        x={textPoint[0]}
        y={textPoint[1]}
      >
        {length.toFixed(1)}
        {unit}
      </text>
      <polyline style={polyline.dashLine} points={connectingLine} />
    </>
  )
}
