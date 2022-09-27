import React, { ReactElement } from 'react'
import useTextBox from '../../hooks/useTextBox'
import { useOverlayContext } from '../../contexts'

import { getCircleEndPoint } from '../../utils/common/getCircleEndPoint'
import { getCircleRadiusByCenter } from '../../utils/common/getCircleRadius'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { getCircleConnectingLine } from '../../utils/common/getCircleConnectingLine'
import { calculateCircleArea } from '../../utils/common/calculateCircleArea'
import { modifyConnectingLine } from '../../utils/common/modifyConnectingLine'
import { stringifyPoints } from '../../utils/common/stringifyPoints'

import { svgWrapperStyle, textStyle } from '../Viewer.styles'
import { HALF_OF_RULER_TEXT_BOX } from '../../const'

import type { CircleDrawerProps } from './CircleDrawer.types'

export function CircleDrawer({
  isSelectedMode,
  measurement,
  setMeasurementEditMode,
}: CircleDrawerProps): ReactElement | null {
  const { pixelToCanvas } = useOverlayContext()
  const [textBox, ref] = useTextBox()
  const { centerPoint, radius, measuredValue, unit } = measurement

  const endPoint = getCircleEndPoint(centerPoint, radius)
  const [centerPointOnCanvas, endPointOnCanvas] = [centerPoint, endPoint].map(pixelToCanvas)
  const drawingRadius = getCircleRadiusByCenter(centerPointOnCanvas, endPointOnCanvas)

  const textPointOnCanvas = measurement.textPoint
    ? pixelToCanvas(measurement.textPoint)
    : getCircleTextPosition(centerPointOnCanvas, drawingRadius)

  const area = calculateCircleArea(measuredValue)

  const connectingLineToTextBoxCenter = getCircleConnectingLine(
    [centerPointOnCanvas, endPointOnCanvas],
    textPointOnCanvas
  )
  const connectingLineToTextBoxEdge = modifyConnectingLine({ textBox, connectingLineToTextBoxCenter })
  const connectingLine = stringifyPoints(connectingLineToTextBoxEdge)

  const textCenterModifier = textBox ? textBox.height / 2 - HALF_OF_RULER_TEXT_BOX : 0

  return (
    <>
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={svgWrapperStyle.outline}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={{ ...svgWrapperStyle.extendsArea, cursor: isSelectedMode ? 'grab' : 'pointer' }}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <polyline style={svgWrapperStyle.dashLine} points={connectingLine} />
      <text
        ref={ref}
        onMouseDown={() => setMeasurementEditMode('textMove')}
        style={{
          ...textStyle[isSelectedMode ? 'select' : 'default'],
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
