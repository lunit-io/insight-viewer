import React, { ReactElement } from 'react'

import { textStyle, svgWrapperStyle, pointSvgStyle } from '../../viewer.styles'

import type { PointViewerProps } from './PointViewer.types'

export function PointViewer({ annotation, showLabel, isHovered }: PointViewerProps): ReactElement {
  const { drawingPoint, canvasLabelPosition: labelPosition, label, id } = annotation

  return (
    <>
      <g
        transform={`translate(${drawingPoint[0]} ${drawingPoint[1]})`}
        data-focus={isHovered}
        className="annotation-point pointer"
      >
        <path
          style={svgWrapperStyle[isHovered ? 'hoveredOutline' : 'outline']}
          transform="translate(-8 -16)"
          d="M8,16c0,0,6-5.582,6-10s-2.686-6-6-6S2,1.582,2,6S8,16,8,16z M5,5c0-1.657,1.343-3,3-3s3,1.343,3,3S9.657,8,8,8S5,6.657,5,5  z"
        />
        <path
          style={pointSvgStyle.default}
          transform="translate(-8 -16)"
          d="M8,16c0,0,6-5.582,6-10s-2.686-6-6-6S2,1.582,2,6S8,16,8,16z M5,5c0-1.657,1.343-3,3-3s3,1.343,3,3S9.657,8,8,8S5,6.657,5,5  z"
        />
      </g>
      {showLabel && labelPosition && (
        <text
          className="annotation-point label pointer"
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
