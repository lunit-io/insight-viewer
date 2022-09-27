import React, { ReactElement } from 'react'
import useTextBox from '../../hooks/useTextBox'
import { useOverlayContext } from '../../contexts'

import { calculateCircleArea } from '../../utils/common/calculateCircleArea'
import { getCircleRadiusByCenter } from '../../utils/common/getCircleRadius'
import { getCircleEndPoint } from '../../utils/common/getCircleEndPoint'
import { getCircleConnectingLine } from '../../utils/common/getCircleConnectingLine'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { modifyConnectingLine } from '../../utils/common/modifyConnectingLine'
import { stringifyPoints } from '../../utils/common/stringifyPoints'

import { textStyle, svgWrapperStyle } from '../Viewer.styles'
import { HALF_OF_RULER_TEXT_BOX } from '../../const'

import type { CircleViewerProps } from './CircleViewer.types'

export function CircleViewer({ measurement, hoveredMeasurement }: CircleViewerProps): ReactElement {
  const [textBox, ref] = useTextBox()
  const { pixelToCanvas } = useOverlayContext()

  const { centerPoint, radius, measuredValue, unit } = measurement

  const endPoint = getCircleEndPoint(centerPoint, radius)
  const [centerPointOnCanvas, endPointOnCanvas] = [centerPoint, endPoint].map(pixelToCanvas)

  const drawingRadius = getCircleRadiusByCenter(centerPointOnCanvas, endPointOnCanvas)

  const textPointOnCanvas = measurement.textPoint
    ? pixelToCanvas(measurement.textPoint)
    : getCircleTextPosition(centerPointOnCanvas, drawingRadius)

  const area = calculateCircleArea(measuredValue)

  const isHoveredMeasurement = measurement === hoveredMeasurement
  const textCenterModifier = textBox ? textBox.height / 2 - HALF_OF_RULER_TEXT_BOX : 0

  const connectingLineToTextBoxCenter = getCircleConnectingLine(
    [centerPointOnCanvas, endPointOnCanvas],
    textPointOnCanvas
  )
  const connectingLineToTextBoxEdge = modifyConnectingLine({ textBox, connectingLineToTextBoxCenter })
  const connectingLine = stringifyPoints(connectingLineToTextBoxEdge)

  return (
    <>
      <circle
        style={{
          ...svgWrapperStyle[isHoveredMeasurement ? 'hoveredOutline' : 'outline'],
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        style={{
          ...svgWrapperStyle.extendsArea,
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        style={{
          ...svgWrapperStyle.default,
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />

      <polyline style={svgWrapperStyle.dashLine} points={connectingLine} />
      <text
        ref={ref}
        style={{
          ...textStyle[isHoveredMeasurement ? 'hover' : 'default'],
          visibility: textBox !== null ? 'visible' : 'hidden',
        }}
        x={textPointOnCanvas[0]}
        y={textPointOnCanvas[1] + textCenterModifier}
      >
        {`Area = ${area.toLocaleString(undefined, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })}${unit}2`}
      </text>
    </>
  )
}
