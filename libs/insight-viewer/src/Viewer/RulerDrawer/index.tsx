import React, { ReactElement } from 'react'

import { viewerStyle, textStyle } from '../Viewer.styles'

import { getRulerTextPosition } from '../../utils/common/getRulerTextPosition'
import { getConnectingLinePoints } from '../../utils/common/getConnectingLinePoints'
import { useOverlayContext } from '../../contexts'

import type { Point } from '../../types'
import type { RulerDrawerProps } from './RulerDrawer.types'

function stringifyPoints(points: Point[]): string {
  return points.map((point) => `${point[0]},${point[1]}`).join(' ')
}

export function RulerDrawer({
  measurement,
  isSelectedMode,
  setMeasurementEditMode,
}: RulerDrawerProps): ReactElement | null {
  const { pixelToCanvas } = useOverlayContext()
  const { startAndEndPoint, measuredValue, unit } = measurement

  const startAndEndPointOnCanvas = startAndEndPoint.map(pixelToCanvas) as [Point, Point]
  const textPointOnCanvas = pixelToCanvas(measurement.textPoint ?? getRulerTextPosition(startAndEndPoint[1]))

  const rulerLine = stringifyPoints(startAndEndPointOnCanvas)
  const connectingLine = stringifyPoints(getConnectingLinePoints(startAndEndPointOnCanvas, textPointOnCanvas))

  return (
    <>
      <polyline onMouseDown={() => setMeasurementEditMode('move')} style={viewerStyle.outline} points={rulerLine} />
      <polyline
        data-cy-move
        onMouseDown={() => setMeasurementEditMode('move')}
        style={{ ...viewerStyle.extendsArea, cursor: isSelectedMode ? 'grab' : 'pointer' }}
        points={rulerLine}
      />
      <polyline
        data-cy-move
        onMouseDown={() => setMeasurementEditMode('move')}
        style={viewerStyle[isSelectedMode ? 'select' : 'default']}
        points={rulerLine}
      />
      <text
        onMouseDown={() => setMeasurementEditMode('textMove')}
        style={{ ...textStyle[isSelectedMode ? 'select' : 'default'] }}
        x={textPointOnCanvas[0]}
        y={textPointOnCanvas[1]}
      >
        {measuredValue.toFixed(1)}
        {unit}
      </text>
      <polyline style={viewerStyle.dashLine} points={connectingLine} />
    </>
  )
}
