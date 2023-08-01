import React, { ReactElement } from 'react'

import { svgWrapperStyle, textStyle } from '../../viewer.styles'

import type { PointDrawerProps } from './PointDrawer.types'

export function PointDrawer({
  annotation,
  isSelectedMode,
  showAnnotationLabel,
  setAnnotationEditMode,
}: PointDrawerProps): ReactElement | null {
  const { drawingPoint, canvasLabelPosition: labelPosition, cursorClassName, label, id } = annotation

  const handleMoveOnMouseDown = () => setAnnotationEditMode('move')
  const handleTextMoveOnMouseDown = () => setAnnotationEditMode('textMove')

  return (
    <>
      <circle
        className={`annotation-circle ${cursorClassName}`}
        style={svgWrapperStyle.outline}
        cx={drawingPoint[0]}
        cy={drawingPoint[1]}
        r={5}
      />
      <circle
        className={`annotation-circle ${cursorClassName}`}
        style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
        cx={drawingPoint[0]}
        cy={drawingPoint[1]}
        r={5}
      />
      <circle
        className={`annotation-circle ${cursorClassName}`}
        onMouseDown={handleMoveOnMouseDown}
        style={{ ...svgWrapperStyle.extendsArea }}
        cx={drawingPoint[0]}
        cy={drawingPoint[1]}
        r={5}
      />
      {showAnnotationLabel && labelPosition && (
        <text
          className={`annotation-circle label ${cursorClassName}`}
          onMouseDown={handleTextMoveOnMouseDown}
          style={{
            ...textStyle[isSelectedMode ? 'select' : 'default'],
          }}
          x={labelPosition[0]}
          y={labelPosition[1]}
        >
          {label ?? id}
        </text>
      )}
    </>
  )
}
