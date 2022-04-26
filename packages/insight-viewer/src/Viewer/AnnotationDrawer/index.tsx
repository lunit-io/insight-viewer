/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from 'react'

import { svgStyle } from './AnnotationDrawer.styles'
import { AnnotationDrawerProps } from './AnnotationDrawer.types'
import useAnnotationPointsHandler from '../../hooks/useAnnotationPointsHandler'
import { PolylineDrawer } from '../PolylineDrawer'

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
  const { points } = useAnnotationPointsHandler({
    mode,
    lineHead,
    annotations,
    svgElement: svgRef,
    addAnnotation: onAdd,
  })

  return (
    <>
      {points.length > 1 ? (
        <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
          {(mode === 'polygon' || mode === 'freeLine' || mode === 'line') && (
            <PolylineDrawer points={points} mode={mode} lineHead={lineHead} />
          )}
        </svg>
      ) : null}
    </>
  )
}
