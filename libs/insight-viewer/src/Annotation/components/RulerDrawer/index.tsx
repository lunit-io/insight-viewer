import React, { ReactElement } from 'react'

import useRulerAnnotation from '../../hooks/useRulerMeasurement'
import { svgWrapperStyle, textStyle } from '../../viewer.styles'

import type { RulerDrawerProps } from './RulerDrawer.types'

export function RulerDrawer({
  annotation,
  isSelectedMode,
  setAnnotationEditMode,
}: RulerDrawerProps): ReactElement | null {
  const { formattedValue, drawingPointsToString, cursorClassName } = annotation

  const { ref, connectingLine, textBoxPoint, visibility } = useRulerAnnotation(annotation)

  const handleMoveOnMouseDown = () => setAnnotationEditMode('move')
  const handleTextMoveOnMouseDown = () => setAnnotationEditMode('textMove')

  return (
    <>
      <polyline
        className={`annotation-ruler ${cursorClassName}`}
        onMouseDown={handleMoveOnMouseDown}
        style={svgWrapperStyle.outline}
        points={drawingPointsToString}
      />
      <polyline
        data-cy-move
        className={`annotation-ruler ${cursorClassName}`}
        onMouseDown={handleMoveOnMouseDown}
        style={{ ...svgWrapperStyle[isSelectedMode ? 'selectedExtendsArea' : 'extendsArea'] }}
        points={drawingPointsToString}
      />
      <polyline
        data-cy-move
        className={`annotation-ruler ${cursorClassName}`}
        style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
        onMouseDown={handleMoveOnMouseDown}
        points={drawingPointsToString}
      />
      <polyline
        className={`annotation-ruler ${cursorClassName}`}
        style={{ ...svgWrapperStyle.dashLine, visibility }}
        onMouseDown={handleMoveOnMouseDown}
        points={connectingLine}
      />

      <text
        ref={ref}
        className={`annotation-ruler label ${cursorClassName}`}
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
