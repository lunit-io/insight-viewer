/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useState } from 'react'

import { svgStyle } from './AnnotationDrawer.styles'
import { TextAnnotation } from '../../types'
import { AnnotationDrawerProps } from './AnnotationDrawer.types'
import useAnnotationPointsHandler from '../../hooks/useAnnotationPointsHandler'
import { PolylineDrawer } from '../PolylineDrawer'
import { TextDrawer, TypingDrawer } from '../TextDrawer'

export function AnnotationDrawer({
  style,
  width,
  height,
  annotations,
  className,
  lineHead = 'normal',
  mode = 'polygon',
  onAdd,
}: AnnotationDrawerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const [tempAnnotation, setTempAnnotation] = useState<TextAnnotation>()
  const { points } = useAnnotationPointsHandler({
    mode,
    lineHead,
    annotations,
    svgElement: svgRef,
    addAnnotation: mode === 'text' ? a => setTempAnnotation(a as TextAnnotation) : onAdd,
  })
  const handleFinish = (text: string) => {
    setTempAnnotation(undefined)
    if (tempAnnotation && text !== '') {
      onAdd({ ...tempAnnotation, label: text })
    }
  }

  return (
    <>
      {points.length > 1 && (
        <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
          {(mode === 'polygon' || mode === 'freeLine' || mode === 'line') && (
            <PolylineDrawer points={points} mode={mode} lineHead={lineHead} />
          )}
          {mode === 'text' && <TextDrawer points={points} />}
        </svg>
      )}
      {tempAnnotation && (
        <svg width={width} height={height} style={{ ...svgStyle.default, ...style }}>
          <TypingDrawer points={tempAnnotation.points} onFinish={handleFinish} />
        </svg>
      )}
    </>
  )
}
