import React from 'react'

import { TextViewerProps } from './TextViewer.types'
import { textStyle, textBoxStyle, TEXT_SIZE, LINE_HEIGHT } from '../AnnotationViewer/AnnotationViewer.styles'
import { useOverlayContext } from '../../contexts'
import { TEXT_PADDING } from '../../const'

export function TextViewer({ annotation, hoveredAnnotation }: TextViewerProps): React.ReactElement {
  const { pixelToCanvas } = useOverlayContext()
  const isHoveredAnnotation = annotation === hoveredAnnotation
  const canvasPoints = annotation.points.map(pixelToCanvas)
  const [start, end] = canvasPoints
  const dimensions = [end[0] - start[0], end[1] - start[1]]

  return (
    <>
      <text
        style={{
          ...textStyle[isHoveredAnnotation ? 'select' : 'default'],
          textAnchor: 'start',
          dominantBaseline: 'hanging',
        }}
        x={start[0] + TEXT_PADDING}
        y={start[1] + TEXT_PADDING}
      >
        {annotation.label.split('\n').map((line, index) => (
          <tspan x={start[0] + TEXT_PADDING} y={start[1] + index * TEXT_SIZE * LINE_HEIGHT + TEXT_PADDING} key={index}>
            {line}
          </tspan>
        ))}
      </text>
      <rect
        style={{ ...textBoxStyle[isHoveredAnnotation ? 'select' : 'default'] }}
        x={start[0]}
        y={start[1]}
        width={dimensions[0]}
        height={dimensions[1]}
      />
    </>
  )
}
