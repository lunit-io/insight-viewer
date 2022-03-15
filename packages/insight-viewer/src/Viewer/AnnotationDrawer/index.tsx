/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from 'react'

import { svgStyle } from './AnnotationDrawer.styles'
import { AnnotationDrawerProps } from './AnnotationDrawer.types'
import useAnnotationDrawing from '../../hooks/useAnnotationDrawing'
import { PolylineDrawer } from '../PolylineDrawer'

export function AnnotationDrawer({
  style,
  width,
  height,
  device,
  annotations,
  className,
  head = 'normal',
  mode = 'polygon',
  onAdd,
}: AnnotationDrawerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const [annotationPoints] = useAnnotationDrawing({
    mode,
    device,
    annotations,
    svgElement: svgRef,
    onAdd,
  })

  return (
    <>
      {annotationPoints.length > 1 ? (
        <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
          {(mode === 'polygon' || mode === 'freeLine' || mode === 'line') && (
            <PolylineDrawer polygon={annotationPoints} mode={mode} head={head} />
          )}
        </svg>
      ) : null}
    </>
  )
}
