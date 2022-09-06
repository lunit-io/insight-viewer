import React, { ReactElement } from 'react'

import { textStyle, viewerStyle } from '../Viewer.styles'

import { getRulerTextPosition } from '../../utils/common/getRulerTextPosition'
import { getConnectingLinePoints } from '../../utils/common/getConnectingLinePoints'
import { useOverlayContext } from '../../contexts'

import type { Point } from '../../types'
import type { RulerViewerProps } from './RulerViewer.types'

function stringifyPoints(points: Point[]): string {
  return points.map((point) => `${point[0]},${point[1]}`).join(' ')
}

export function RulerViewer({ measurement, hoveredMeasurement }: RulerViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()
  const { startAndEndPoint, measuredValue, unit } = measurement
  const isHoveredMeasurement = measurement === hoveredMeasurement

  const startAndEndPointOnCanvas = startAndEndPoint.map(pixelToCanvas) as [Point, Point]
  const textPointOnCanvas = pixelToCanvas(measurement.textPoint ?? getRulerTextPosition(startAndEndPoint[1]))

  const rulerLine = stringifyPoints(startAndEndPointOnCanvas)
  const connectingLine = stringifyPoints(getConnectingLinePoints(startAndEndPointOnCanvas, textPointOnCanvas))

  return (
    <>
      <polyline
        style={{
          ...viewerStyle[isHoveredMeasurement ? 'hoveredOutline' : 'outline'],
        }}
        data-select={isHoveredMeasurement || undefined}
        points={rulerLine}
      />
      <polyline
        style={{
          ...viewerStyle.extendsArea,
        }}
        data-select={isHoveredMeasurement || undefined}
        points={rulerLine}
      />
      <polyline
        style={{
          ...viewerStyle.default,
        }}
        data-select={isHoveredMeasurement || undefined}
        points={rulerLine}
      />
      {measuredValue && (
        <text
          style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }}
          x={textPointOnCanvas[0]}
          y={textPointOnCanvas[1]}
        >
          {measuredValue.toFixed(1)}
          {unit}
        </text>
      )}
      <polyline style={viewerStyle.dashLine} points={connectingLine} />
    </>
  )
}
