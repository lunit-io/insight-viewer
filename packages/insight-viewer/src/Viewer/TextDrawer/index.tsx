import React from 'react'

import { TextDrawerProps } from './TextDrawer.types'
import { textBoxStyle } from '../AnnotationViewer/AnnotationViewer.styles'
import { useOverlayContext } from '../../contexts'

export { Typing as TypingDrawer } from './Typing'

export function TextDrawer({ points, setAnnotationEditMode }: TextDrawerProps): React.ReactElement | null {
  const { pixelToCanvas } = useOverlayContext()
  const canvasPoints = points.map(pixelToCanvas)
  const [start, end] = canvasPoints
  if (typeof end === 'undefined' || end[0] < start[0] || end[1] < start[1]) {
    return null
  }
  const dimensions = [end[0] - start[0], end[1] - start[1]]

  return (
    <>
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
