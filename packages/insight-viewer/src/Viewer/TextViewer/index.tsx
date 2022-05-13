import React from 'react'

import { TextViewerProps } from './TextViewer.types'
import { textStyle, textBoxStyle } from '../AnnotationViewer/AnnotationViewer.styles'
import { useOverlayContext } from '../../contexts'
import { TEXT_PADDING } from '../../const'

export function TextViewer({ annotation, selectedAnnotation }: TextViewerProps): React.ReactElement {
  const { pixelToCanvas } = useOverlayContext()
  const isSelectedAnnotation = annotation === selectedAnnotation
  const canvasPoints = annotation.points.map(pixelToCanvas)
  const [start, end] = canvasPoints
  const dimensions = [end[0] - start[0], end[1] - start[1]]

  return (
    <>
      <text
        style={{
          ...textStyle[isSelectedAnnotation ? 'select' : 'default'],
          textAnchor: 'start',
          dominantBaseline: 'hanging',
        }}
        x={start[0] + TEXT_PADDING}
        y={start[1] + TEXT_PADDING}
      >
        {annotation.label}
      </text>
      <rect style={textBoxStyle.default} x={start[0]} y={start[1]} width={dimensions[0]} height={dimensions[1]} />
    </>
  )
}
