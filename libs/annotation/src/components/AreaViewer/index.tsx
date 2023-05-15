import React, { ReactElement } from 'react'

import useCircleAnnotation from '../../hooks/useCircleAnnotation'

import { textStyle, svgWrapperStyle } from '../../viewer.styles'

import type { AreaViewerProps } from './AreaViewer.types'

export function AreaViewer({ annotation, isHovered }: AreaViewerProps): ReactElement {
  const { centerPointOnCanvas, formattedValue, ref, drawingRadius, textBoxPoint, connectingLine, visibility } =
    useCircleAnnotation(annotation)

  return (
    <>
      <circle
        className="annotation-circle pointer"
        style={{
          ...svgWrapperStyle[isHovered ? 'hoveredOutline' : 'outline'],
        }}
        data-focus={isHovered}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        className="annotation-circle pointer"
        style={{
          ...svgWrapperStyle.extendsArea,
        }}
        data-focus={isHovered}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <circle
        className="annotation-circle pointer"
        style={{
          ...svgWrapperStyle.default,
        }}
        data-focus={isHovered}
        cx={centerPointOnCanvas[0]}
        cy={centerPointOnCanvas[1]}
        r={drawingRadius}
      />
      <polyline style={{ ...svgWrapperStyle.dashLine, visibility }} points={connectingLine} />
      <text
        ref={ref}
        style={{
          ...textStyle[isHovered ? 'hover' : 'default'],
          visibility,
        }}
        x={textBoxPoint[0]}
        y={textBoxPoint[1]}
        className="annotation-circle label pointer"
      >
        {formattedValue}
      </text>
    </>
  )
}
