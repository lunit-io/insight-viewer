import React, { ReactElement } from 'react'
import useCircleMeasurement from '../../hooks/useCircleMeasurement'

import { svgWrapperStyle, textStyle } from '../Viewer.styles'
import type { CircleDrawerProps } from './CircleDrawer.types'

export function CircleDrawer({
  isSelectedMode,
  measurement,
  setMeasurementEditMode,
}: CircleDrawerProps): ReactElement | null {
  const { centerPointOnCanvas, formattedValue, ref, drawingRadius, textBoxPoint, connectingLine, visibility } =
    useCircleMeasurement(measurement)

  const handleMoveOnMouseDown = () => setMeasurementEditMode('move')
  const handleTextMoveOnMouseDown = () => setMeasurementEditMode('textMove')

  return (
    <>
      <circle
        className="measurement-circle pointer"
        style={svgWrapperStyle.outline}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        className="measurement-circle pointer"
        style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        className="measurement-circle pointer drag"
        onMouseDown={handleMoveOnMouseDown}
        style={{ ...svgWrapperStyle[isSelectedMode ? 'selectedExtendsArea' : 'extendsArea'] }}
      />
      <polyline style={{ ...svgWrapperStyle.dashLine, visibility }} points={connectingLine} />
      <text
        ref={ref}
        className="measurement-circle label pointer"
        onMouseDown={handleTextMoveOnMouseDown}
        style={{ ...textStyle[isSelectedMode ? 'select' : 'default'] }}
        x={textBoxPoint[0]}
        y={textBoxPoint[1]}
      >
        {formattedValue}
      </text>
    </>
  )
}
