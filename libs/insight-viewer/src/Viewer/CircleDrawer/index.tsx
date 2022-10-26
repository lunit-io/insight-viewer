import React, { ReactElement } from 'react'
import useCircleMeasurement from '../../hooks/useCircleMeasurement'

import { svgWrapperStyle, textStyle } from '../Viewer.styles'

import type { CircleDrawerProps } from './CircleDrawer.types'

export function CircleDrawer({
  isSelectedMode,
  measurement,
  setMeasurementEditMode,
  cursorStatus,
}: CircleDrawerProps): ReactElement | null {
  const { centerPointOnCanvas, formattedValue, ref, drawingRadius, textBoxPoint, connectingLine, visibility } =
    useCircleMeasurement(measurement)

  const handleMoveOnMouseDown = () => setMeasurementEditMode('move')
  const handleTextMoveOnMouseDown = () => setMeasurementEditMode('textMove')

  const cursorClassName = cursorStatus === null ? 'pointer' : ''

  return (
    <>
      <circle
        className={`measurement-circle ${cursorClassName}`}
        style={svgWrapperStyle.outline}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        className={`measurement-circle ${cursorClassName}`}
        style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        className={`measurement-circle ${cursorClassName}`}
        onMouseDown={handleMoveOnMouseDown}
        style={{ ...svgWrapperStyle.extendsArea, cursor: isSelectedMode ? 'grab' : 'pointer' }}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <polyline style={{ ...svgWrapperStyle.dashLine, visibility }} points={connectingLine} />
      <text
        ref={ref}
        className={`measurement-circle label ${cursorClassName}`}
        onMouseDown={handleTextMoveOnMouseDown}
        style={{
          ...textStyle[isSelectedMode ? 'select' : 'default'],
          visibility,
        }}
        x={textBoxPoint[0]}
        y={textBoxPoint[1]}
      >
        {formattedValue}
      </text>
    </>
  )
}
