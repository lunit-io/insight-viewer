import React, { ReactElement } from 'react'
import useRulerMeasurement from '../../hooks/useRulerMeasurement'

import { svgWrapperStyle, textStyle } from '../Viewer.styles'
import type { RulerDrawerProps } from './RulerDrawer.types'

export function RulerDrawer({
  measurement,
  isSelectedMode,
  setMeasurementEditMode,
  cursorStatus,
}: RulerDrawerProps): ReactElement | null {
  const { rulerLine, ref, connectingLine, formattedValue, textBoxPoint, visibility } = useRulerMeasurement(measurement)

  const handleMoveOnMouseDown = () => setMeasurementEditMode('move')
  const handleTextMoveOnMouseDown = () => setMeasurementEditMode('textMove')

  const cursorClassName = cursorStatus === null ? 'pointer' : ''

  return (
    <>
      <polyline
        className={`measurement-ruler ${cursorClassName}`}
        onMouseDown={handleMoveOnMouseDown}
        style={svgWrapperStyle.outline}
        points={rulerLine}
      />
      <polyline
        data-cy-move
        className={`measurement-ruler ${cursorClassName}`}
        onMouseDown={handleMoveOnMouseDown}
        style={{ ...svgWrapperStyle[isSelectedMode ? 'selectedExtendsArea' : 'extendsArea'] }}
        points={rulerLine}
      />
      <polyline
        data-cy-move
        className={`measurement-ruler ${cursorClassName}`}
        style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
        points={rulerLine}
      />
      <polyline
        className={`measurement-ruler ${cursorClassName}`}
        style={{ ...svgWrapperStyle.dashLine, visibility }}
        points={connectingLine}
      />

      <text
        ref={ref}
        className={`measurement-ruler label ${cursorClassName}`}
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
