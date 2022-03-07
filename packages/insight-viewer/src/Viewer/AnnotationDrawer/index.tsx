/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from 'react'

import { Annotation } from '../../types'
import { svgStyle } from './AnnotationDrawer.styles'
import { AnnotationDrawerProps } from './AnnotationDrawer.types'
import useAnnotationDrawing from '../../hooks/useAnnotationDrawing'
import { PolylineDrawer } from '../PolylineDrawer'

export function AnnotationDrawer<T extends Annotation>({
  style,
  width,
  height,
  device,
  annotations,
  className,
  mode = 'polygon',
  onAdd,
  onFocus,
  onRemove,
}: AnnotationDrawerProps<T>): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const [annotation] = useAnnotationDrawing({
    mode,
    device,
    annotations,
    svgElement: svgRef,
    onAdd,
    onFocus,
    onRemove,
  })

  return (
    <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
      {(mode === 'polygon' || mode === 'freeLine') && <PolylineDrawer polygon={annotation} mode={mode} />}
    </svg>
  )
}
