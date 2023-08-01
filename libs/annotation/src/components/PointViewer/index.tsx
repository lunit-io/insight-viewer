import React, { ReactElement } from 'react'

import { textStyle, svgWrapperStyle } from '../../viewer.styles'

import type { PointViewerProps } from './PointViewer.types'

export function PointViewer({ annotation, showLabel, isHovered }: PointViewerProps): ReactElement {
  const { drawingPoint, canvasLabelPosition: labelPosition, label, id } = annotation

  return (
    <>
      <circle
        className="annotation-circle pointer"
        style={{
          ...svgWrapperStyle[isHovered ? 'hoveredOutline' : 'outline'],
        }}
        data-focus={isHovered}
        cx={drawingPoint[0]}
        cy={drawingPoint[1]}
        r={5}
      />
      <circle
        className="annotation-circle pointer"
        style={{
          ...svgWrapperStyle.extendsArea,
        }}
        data-focus={isHovered}
        cx={drawingPoint[0]}
        cy={drawingPoint[1]}
        r={5}
      />
      <circle
        className="annotation-circle pointer"
        style={{
          ...svgWrapperStyle.default,
        }}
        data-focus={isHovered}
        cx={drawingPoint[0]}
        cy={drawingPoint[1]}
        r={5}
      />
      {showLabel && labelPosition && (
        <text
          className="annotation-polygon label pointer"
          style={{ ...textStyle.default }}
          x={labelPosition[0]}
          y={labelPosition[1]}
        >
          {label ?? id}
        </text>
      )}
    </>
  )
}
