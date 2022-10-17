import React, { ReactElement } from 'react'

import { svgWrapperStyle, textStyle } from '../Viewer.styles'

import { getRulerTextPosition } from '../../utils/common/getRulerTextPosition'
import { getConnectingLinePoints } from '../../utils/common/getConnectingLinePoints'
import { useOverlayContext } from '../../contexts'

import type { Point } from '../../types'
import type { RulerDrawerProps } from './RulerDrawer.types'
import { HALF_OF_RULER_TEXT_BOX } from '../../const'

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
  const textPointOnCanvas = measurement.textPoint
    ? pixelToCanvas(measurement.textPoint)
    : getRulerTextPosition(startAndEndPointOnCanvas)

  const rulerLine = stringifyPoints(startAndEndPointOnCanvas)
  const connectingLine = stringifyPoints(getConnectingLinePoints(startAndEndPointOnCanvas, textPointOnCanvas))

  const handleMoveOnMouseDown = () => setMeasurementEditMode('move')
  const handleTextMoveOnMouseDown = () => setMeasurementEditMode('textMove')

  return (
    <>
      <polyline
        className="measurement-ruler pointer"
        onMouseDown={handleMoveOnMouseDown}
        style={svgWrapperStyle.outline}
        points={rulerLine}
      />
      <polyline
        data-cy-move
        className="measurement-ruler pointer"
        onMouseDown={handleMoveOnMouseDown}
        style={{ ...svgWrapperStyle[isSelectedMode ? 'selectedExtendsArea' : 'extendsArea'] }}
        points={rulerLine}
      />
      <polyline
        data-cy-move
        className="measurement-ruler pointer"
        onMouseDown={handleMoveOnMouseDown}
        style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
        points={rulerLine}
      />
      <polyline style={svgWrapperStyle.dashLine} points={connectingLine} />
      <text
        className="measurement-ruler label pointer grabbing"
        ref={ref}
        onMouseDown={handleTextMoveOnMouseDown}
        style={{ ...textStyle[isSelectedMode ? 'select' : 'default'] }}
        x={textPointOnCanvas[0]}
        y={textPointOnCanvas[1] + HALF_OF_RULER_TEXT_BOX}
      >
        {measuredValue.toFixed(1)}
        {unit}
      </text>
    </>
  )
}
