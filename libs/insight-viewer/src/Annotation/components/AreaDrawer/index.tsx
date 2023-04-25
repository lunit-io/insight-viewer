import React, { ReactElement } from 'react'
import useCircleAnnotation from '../../hooks/useCircleAnnotation'

import { svgWrapperStyle, textStyle } from '../../viewer.styles'

import type { AreaDrawerProps } from './AreaDrawer.types'

export function AreaDrawer({
  annotation,
  isSelectedMode,
  setAnnotationEditMode,
}: AreaDrawerProps): ReactElement | null {
  const { formattedValue, drawingCenter, drawingRadius, cursorClassName } = annotation

  const { ref, textBoxPoint, connectingLine, visibility } = useCircleAnnotation(annotation)

  const handleMoveOnMouseDown = () => setAnnotationEditMode('move')
  const handleTextMoveOnMouseDown = () => setAnnotationEditMode('textMove')

  return (
    <>
      <circle
        className={`annotation-circle ${cursorClassName}`}
        style={svgWrapperStyle.outline}
        cx={drawingCenter[0]}
        cy={drawingCenter[1]}
        r={drawingRadius}
      />
      <circle
        className={`annotation-circle ${cursorClassName}`}
        style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
        cx={drawingCenter[0]}
        cy={drawingCenter[1]}
        r={drawingRadius}
      />
      <circle
        className={`annotation-circle ${cursorClassName}`}
        onMouseDown={handleMoveOnMouseDown}
        style={{ ...svgWrapperStyle.extendsArea }}
        cx={drawingCenter[0]}
        cy={drawingCenter[1]}
        r={drawingRadius}
      />
      <polyline style={{ ...svgWrapperStyle.dashLine, visibility }} points={connectingLine} />
      <text
        ref={ref}
        className={`annotation-circle label ${cursorClassName}`}
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
