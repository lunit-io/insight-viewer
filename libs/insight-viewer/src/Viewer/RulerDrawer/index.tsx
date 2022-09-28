import React, { ReactElement } from 'react'
import useRulerMeasurement from '../../hooks/useRulerMeasurement'

import { svgWrapperStyle, textStyle } from '../Viewer.styles'
import type { RulerDrawerProps } from './RulerDrawer.types'

export function RulerDrawer({
  measurement,
  isSelectedMode,
  setMeasurementEditMode,
}: RulerDrawerProps): ReactElement | null {
  const { rulerLine, ref, connectingLine, formattedValue, textBoxPoint, visibility } = useRulerMeasurement(measurement)

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
      <polyline style={{ ...svgWrapperStyle.dashLine, visibility }} points={connectingLine} />
      <text
        ref={ref}
        onMouseDown={handleTextMoveOnMouseDown}
        style={{ ...textStyle[isSelectedMode ? 'select' : 'default'], visibility }}
        x={textBoxPoint[0]}
        y={textBoxPoint[1]}
      >
        {formattedValue}
      </text>
    </>
  )
}
