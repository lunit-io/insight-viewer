import React, { ReactElement } from 'react'
import useTextBox from '../../hooks/useTextBox'
import { useOverlayContext } from '../../contexts'

import { getRulerTextPosition } from '../../utils/common/getRulerTextPosition'
import { modifyConnectingLine } from '../../utils/common/modifyConnectingLine'
import { stringifyPoints } from '../../utils/common/stringifyPoints'

import { HALF_OF_RULER_TEXT_BOX } from '../../const'
import { svgWrapperStyle, textStyle } from '../Viewer.styles'

import type { Point } from '../../types'
import type { RulerDrawerProps } from './RulerDrawer.types'

export function RulerDrawer({
  measurement,
  isSelectedMode,
  setMeasurementEditMode,
}: RulerDrawerProps): ReactElement | null {
  const { pixelToCanvas } = useOverlayContext()
  const [textBox, ref] = useTextBox()
  const { startAndEndPoint, measuredValue, unit } = measurement

  const startAndEndPointOnCanvas = startAndEndPoint.map(pixelToCanvas) as [Point, Point]
  const textPointOnCanvas = measurement.textPoint
    ? pixelToCanvas(measurement.textPoint)
    : getRulerTextPosition(startAndEndPointOnCanvas)

  const rulerLine = stringifyPoints(startAndEndPointOnCanvas)
  const textCenterModifier = textBox ? textBox.height / 2 - HALF_OF_RULER_TEXT_BOX : 0

  const connectingLineToTextBoxEdge = modifyConnectingLine({
    textBox,
    connectingLineToTextBoxCenter: [startAndEndPointOnCanvas[1], textPointOnCanvas],
  })
  const connectingLine = stringifyPoints(connectingLineToTextBoxEdge)

  const handleMoveOnMouseDown = () => setMeasurementEditMode('move')
  const handleTextMoveOnMouseDown = () => setMeasurementEditMode('textMove')

  return (
    <>
      <polyline onMouseDown={handleMoveOnMouseDown} style={svgWrapperStyle.outline} points={rulerLine} />
      <polyline
        data-cy-move
        onMouseDown={handleMoveOnMouseDown}
        style={{ ...svgWrapperStyle.extendsArea, cursor: isSelectedMode ? 'grab' : 'pointer' }}
        points={rulerLine}
      />
      <polyline
        data-cy-move
        onMouseDown={handleMoveOnMouseDown}
        style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
        points={rulerLine}
      />
      <polyline style={svgWrapperStyle.dashLine} points={connectingLine} />
      <text
        ref={ref}
        onMouseDown={handleTextMoveOnMouseDown}
        style={{ ...textStyle[isSelectedMode ? 'select' : 'default'] }}
        x={textPointOnCanvas[0]}
        y={textPointOnCanvas[1] + textCenterModifier}
      >
        {measuredValue.toFixed(1)}
        {unit}
      </text>
    </>
  )
}
