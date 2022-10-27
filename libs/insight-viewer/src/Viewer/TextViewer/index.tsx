import React from 'react'

import { textStyle, svgBoxStyle, TEXT_SIZE, LINE_HEIGHT } from '../Viewer.styles'
import { useOverlayContext } from '../../contexts'
import { TEXT_PADDING } from '../../const'

import type { TextViewerProps } from './TextViewer.types'

export function TextViewer({ annotation, hoveredAnnotation }: TextViewerProps): React.ReactElement {
  const { pixelToCanvas } = useOverlayContext()
  const isHoveredAnnotation = annotation === hoveredAnnotation
  const canvasPoints = annotation.points.map(pixelToCanvas)
  const [start, end] = canvasPoints
  const dimensions = [end[0] - start[0], end[1] - start[1]]

  return (
    <>
      <text
        className="annotation-text pointer"
        style={{
          ...textStyle[isHoveredAnnotation ? 'hover' : 'default'],
          textAnchor: 'start',
          dominantBaseline: 'hanging',
        }}
        x={start[0] + TEXT_PADDING}
        y={start[1] + TEXT_PADDING}
      >
        {annotation.label.split('\n').map((line, index) => (
          <tspan
            className="annotation-text label pointer"
            x={start[0] + TEXT_PADDING}
            y={start[1] + index * TEXT_SIZE * LINE_HEIGHT + TEXT_PADDING}
            key={index}
          >
            {line}
          </tspan>
        ))}
      </text>
      <rect
        className="annotation-text box pointer"
        style={{ ...svgBoxStyle[isHoveredAnnotation ? 'hover' : 'default'] }}
        x={start[0]}
        y={start[1]}
        width={dimensions[0]}
        height={dimensions[1]}
      />
    </>
  )
}
