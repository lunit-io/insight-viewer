import React from 'react'

import { textStyle, svgBoxStyle, TEXT_SIZE, LINE_HEIGHT } from '../Viewer.styles'
import { useOverlayContext } from '../../contexts'
import { TEXT_PADDING } from '../../const'

import type { TextDrawerProps } from './TextDrawer.types'
export { Typing as TypingDrawer } from './Typing'

export function TextDrawer({ annotation, setAnnotationEditMode }: TextDrawerProps): React.ReactElement | null {
  const { pixelToCanvas } = useOverlayContext()

  const { points, label } = annotation

  const canvasPoints = points.map(pixelToCanvas)
  const [start, end] = canvasPoints
  if (typeof end === 'undefined' || end[0] < start[0] || end[1] < start[1]) {
    return null
  }
  const dimensions = [end[0] - start[0], end[1] - start[1]]

  return (
    <>
      {label && (
        <text
          className="annotation-text label grab"
          style={{
            ...textStyle.select,
            textAnchor: 'start',
            dominantBaseline: 'hanging',
          }}
          x={start[0] + TEXT_PADDING}
          y={start[1] + TEXT_PADDING}
        >
          {label.split('\n').map((line, index) => (
            <tspan
              x={start[0] + TEXT_PADDING}
              y={start[1] + index * TEXT_SIZE * LINE_HEIGHT + TEXT_PADDING}
              key={index}
            >
              {line}
            </tspan>
          ))}
        </text>
      )}
      <rect
        className="annotation-text box grab"
        style={svgBoxStyle.select}
        x={start[0]}
        y={start[1]}
        width={dimensions[0]}
        height={dimensions[1]}
        onMouseDown={() => setAnnotationEditMode('move')}
      />
    </>
  )
}
