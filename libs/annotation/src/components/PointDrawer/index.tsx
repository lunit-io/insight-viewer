import React, { ReactElement } from 'react'

import { svgWrapperStyle, pointSvgStyle, textStyle } from '../../viewer.styles'

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
      <g
        onMouseDown={handleMoveOnMouseDown}
        className={`annotation-point ${cursorClassName}`}
        transform={`translate(${drawingPoint[0]} ${drawingPoint[1]})`}
      >
        <path
          style={svgWrapperStyle[isSelectedMode ? 'select' : 'outline']}
          transform="translate(-8 -16)"
          d="M8,16c0,0,6-5.582,6-10s-2.686-6-6-6S2,1.582,2,6S8,16,8,16z M5,5c0-1.657,1.343-3,3-3s3,1.343,3,3S9.657,8,8,8S5,6.657,5,5  z"
        />
        <path
          style={pointSvgStyle[isSelectedMode ? 'select' : 'default']}
          transform="translate(-8 -16)"
          d="M8,16c0,0,6-5.582,6-10s-2.686-6-6-6S2,1.582,2,6S8,16,8,16z M5,5c0-1.657,1.343-3,3-3s3,1.343,3,3S9.657,8,8,8S5,6.657,5,5  z"
        />
      </g>
      {showAnnotationLabel && labelPosition && (
        <text
          className={`annotation-point label ${cursorClassName}`}
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
