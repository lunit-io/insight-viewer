import React, { ReactElement } from 'react'

import { textStyle, svgWrapperStyle } from '../../viewer.styles'

import type { PolygonViewerProps } from './PolygonViewer.types'

export function PolygonViewer({ annotation, isHovered, showLabel, showOutline }: PolygonViewerProps): ReactElement {
  const { drawingPointsToString, canvasLabelPosition: labelPosition, label, id } = annotation

  return (
    <>
      {showOutline && (
        <polygon
          className="annotation-polygon pointer"
          style={{
            ...svgWrapperStyle[isHovered ? 'hoveredOutline' : 'outline'],
          }}
          data-select={isHovered || undefined}
          points={drawingPointsToString}
        />
      )}
      <polygon
        className="annotation-polygon pointer"
        style={{
          ...svgWrapperStyle.default,
        }}
        data-select={isHovered || undefined}
        points={drawingPointsToString}
      />
      <polygon
        className="annotation-polygon pointer"
        style={{
          ...svgWrapperStyle.extendsArea,
        }}
        data-select={isHovered || undefined}
        points={drawingPointsToString}
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
