import React from 'react'

import { TEXT_PADDING } from '../../const'
import { textStyle, svgBoxStyle, TEXT_SIZE, LINE_HEIGHT } from '../../viewer.styles'
import type { TextViewerProps } from './TextViewer.types'

export function TextViewer({ annotation, isHovered }: TextViewerProps): React.ReactElement {
  const {
    drawingPoints: [startPoint],
    dimensions,
  } = annotation

  return (
    <>
      <text
        className="annotation-text pointer"
        style={{
          ...textStyle[isHovered ? 'hover' : 'default'],
          textAnchor: 'start',
          dominantBaseline: 'hanging',
        }}
        x={startPoint[0] + TEXT_PADDING}
        y={startPoint[1] + TEXT_PADDING}
      >
        {annotation.label.split('\n').map((line, index) => (
          <tspan
            className="annotation-text label pointer"
            x={startPoint[0] + TEXT_PADDING}
            y={startPoint[1] + index * TEXT_SIZE * LINE_HEIGHT + TEXT_PADDING}
            key={index}
          >
            {line}
          </tspan>
        ))}
      </text>
      <rect
        className="annotation-text box pointer"
        style={{ ...svgBoxStyle[isHovered ? 'hover' : 'default'] }}
        x={startPoint[0]}
        y={startPoint[1]}
        width={dimensions[0]}
        height={dimensions[1]}
      />
    </>
  )
}
