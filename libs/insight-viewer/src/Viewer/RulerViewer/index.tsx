import React, { ReactElement } from 'react'
import useTextBox from '../../hooks/useTextBox'
import { useOverlayContext } from '../../contexts'

import { getRulerTextPosition } from '../../utils/common/getRulerTextPosition'
import { modifyConnectingLine } from '../../utils/common/modifyConnectingLine'
import { stringifyPoints } from '../../utils/common/stringifyPoints'

import { HALF_OF_RULER_TEXT_BOX } from '../../const'
import { textStyle, svgWrapperStyle } from '../Viewer.styles'

import type { Point } from '../../types'
import type { RulerViewerProps } from './RulerViewer.types'

export function RulerViewer({ measurement, hoveredMeasurement }: RulerViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()
  const [textBox, ref] = useTextBox()
  const { startAndEndPoint, measuredValue, unit } = measurement
  const isHoveredMeasurement = measurement === hoveredMeasurement

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

  return (
    <>
      <polyline
        style={{
          ...svgWrapperStyle[isHoveredMeasurement ? 'hoveredOutline' : 'outline'],
        }}
        data-select={isHoveredMeasurement || undefined}
        points={rulerLine}
      />
      <polyline
        style={{
          ...svgWrapperStyle.extendsArea,
        }}
        data-select={isHoveredMeasurement || undefined}
        points={rulerLine}
      />
      <polyline
        style={{
          ...svgWrapperStyle.default,
        }}
        data-select={isHoveredMeasurement || undefined}
        points={rulerLine}
      />
      <polyline style={svgWrapperStyle.dashLine} points={connectingLine} />
      {measuredValue ? (
        <text
          ref={ref}
          style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }}
          x={textPointOnCanvas[0]}
          y={textPointOnCanvas[1] + textCenterModifier}
        >
          {measuredValue.toFixed(1)}
          {unit}
        </text>
      ) : null}
    </>
  )
}
