import React, { ReactElement } from 'react'

import { TextViewerProps } from './TextViewer.types'
import { textStyle, textBoxStyle } from '../AnnotationViewer/AnnotationViewer.styles'
import { useOverlayContext } from '../../contexts'
import { TEXT_PADDING } from '../../const'

export function TextViewer({ annotation, selectedAnnotation }: TextViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()
  const isSelectedAnnotation = annotation === selectedAnnotation
  const canvasPoints = annotation.points.map(pixelToCanvas)
  const [start, end] = canvasPoints
  const dimensions = [end[0] - start[0], end[1] - start[1]]
  const center = [start[0] + dimensions[0] / 2, start[1] + dimensions[1] / 2]
  return (
    <>
      <text
        style={{
          ...textStyle[isSelectedAnnotation ? 'select' : 'default'],
          textAnchor: 'start',
          dominantBaseline: 'middle',
        }}
        x={start[0] + TEXT_PADDING}
        y={center[1]}
      >
        {annotation.label}
      </text>
      <rect
        style={textBoxStyle[isSelectedAnnotation ? 'select' : 'default']}
        x={start[0]}
        y={start[1]}
        width={dimensions[0]}
        height={dimensions[1]}
      />
    </>
  )
}
