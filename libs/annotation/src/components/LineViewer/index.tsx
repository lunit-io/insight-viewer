import React, { ReactElement } from 'react'

import { textStyle, svgWrapperStyle } from '../../viewer.styles'

import type { LineViewerProps } from './LineViewer.types'

export function LineViewer({ isHovered, showLabel, showOutline, annotation }: LineViewerProps): ReactElement {
  const { drawingPointsToString, canvasLabelPosition: labelPosition, label, id } = annotation

  return (
    <>
      {showOutline && (
        <polyline
          className="annotation-line pointer"
          style={{
            ...svgWrapperStyle[isHovered ? 'hoveredOutline' : 'outline'],
          }}
          data-select={isHovered || undefined}
          points={drawingPointsToString}
        />
      )}
      {annotation.type === 'arrowLine' && (
        <>
          {showOutline && (
            <polyline
              className="annotation-line arrow pointer"
              style={{
                ...svgWrapperStyle[isHovered ? 'hoveredOutline' : 'outline'],
              }}
              points={annotation.canvasArrowHeadPoints}
            />
          )}
          <polyline
            className="annotation-line arrow pointer"
            style={{ ...svgWrapperStyle.default }}
            points={annotation.canvasArrowHeadPoints}
          />
        </>
      )}
      <polyline
        className="annotation-line pointer"
        style={{
          ...svgWrapperStyle.default,
        }}
        data-select={isHovered || undefined}
        points={drawingPointsToString}
      />
      <polyline
        className="annotation-line pointer"
        style={{
          ...svgWrapperStyle.extendsArea,
        }}
        data-select={isHovered || undefined}
        points={drawingPointsToString}
      />
      {showLabel && labelPosition && (
        <text
          className="annotation-line label pointer"
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
