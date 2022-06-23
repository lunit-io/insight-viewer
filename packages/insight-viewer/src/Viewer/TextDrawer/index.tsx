import React from 'react'

import { TextDrawerProps } from './TextDrawer.types'
import { textStyle, textBoxStyle, TEXT_SIZE, LINE_HEIGHT } from '../AnnotationViewer/AnnotationViewer.styles'
import { useOverlayContext } from '../../contexts'
import { TEXT_PADDING } from '../../const'

export { Typing as TypingDrawer } from './Typing'

export function TextDrawer({ points, label, setAnnotationEditMode }: TextDrawerProps): React.ReactElement | null {
  const { pixelToCanvas } = useOverlayContext()
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
        style={textBoxStyle.select}
        x={start[0]}
        y={start[1]}
        width={dimensions[0]}
        height={dimensions[1]}
        onMouseDown={() => setAnnotationEditMode('move')}
      />
    </>
  )
}
