import React, { ReactElement } from 'react'

import { textStyle, svgWrapperStyle } from '../Viewer.styles'

import { getRulerTextPosition } from '../../utils/common/getRulerTextPosition'
import { getConnectingLinePoints } from '../../utils/common/getConnectingLinePoints'
import { useOverlayContext } from '../../contexts'

import type { Point } from '../../types'
import type { RulerViewerProps } from './RulerViewer.types'
import { HALF_OF_RULER_TEXT_BOX } from '../../const'

function stringifyPoints(points: Point[]): string {
  return points.map((point) => `${point[0]},${point[1]}`).join(' ')
}

export function RulerViewer({ measurement, hoveredMeasurement }: RulerViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()
  const { startAndEndPoint, measuredValue, unit } = measurement
  const isHoveredMeasurement = measurement === hoveredMeasurement

  const startAndEndPointOnCanvas = startAndEndPoint.map(pixelToCanvas) as [Point, Point]
  const textPointOnCanvas = measurement.textPoint
    ? pixelToCanvas(measurement.textPoint)
    : getRulerTextPosition(startAndEndPointOnCanvas)

  const rulerLine = stringifyPoints(startAndEndPointOnCanvas)
  const connectingLine = stringifyPoints(getConnectingLinePoints(startAndEndPointOnCanvas, textPointOnCanvas))

  return (
    <>
      <polyline
        className="measurement-ruler"
        style={{
          ...svgWrapperStyle[isHoveredMeasurement ? 'hoveredOutline' : 'outline'],
        }}
        data-select={isHoveredMeasurement || undefined}
        points={rulerLine}
      />
      <polyline
        className="measurement-ruler"
        style={{
          ...svgWrapperStyle.extendsArea,
        }}
        data-select={isHoveredMeasurement || undefined}
        points={rulerLine}
      />
      <polyline
        className="measurement-ruler"
        style={{
          ...svgWrapperStyle.default,
        }}
        data-select={isHoveredMeasurement || undefined}
        points={rulerLine}
      />
      <polyline className="measurement-ruler dashLine" style={svgWrapperStyle.dashLine} points={connectingLine} />
      {
        <text
          className="measurement-ruler label"
          style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }}
          x={textPointOnCanvas[0]}
          y={textPointOnCanvas[1] + HALF_OF_RULER_TEXT_BOX}
        >
          {measuredValue.toFixed(1)}
          {unit}
        </text>
      }
    </>
  )
}
