/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from 'react'

import { Contour } from '../../types'
import { svgStyle } from './AnnotationDrawer.styles'
import { AnnotationDrawerProps } from './AnnotationDrawer.types'
import useSvgContourDrawing from '../../hooks/useAnnotationDrawing'
import { PolylineDrawer } from '../PolylineDrawer'
import { LineDrawer } from '../LineDrawer'

export function AnnotationDrawer<T extends Contour>({
  style,
  width,
  height,
  device,
  contours,
  className,
  mode = 'polygon',
  onAdd,
  onFocus,
  onRemove,
}: AnnotationDrawerProps<T>): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const [polygon] = useSvgContourDrawing({
    mode,
    device,
    contours,
    svgElement: svgRef,
    onAdd,
    onFocus,
    onRemove,
  })

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ ...svgStyle.default, ...style }}
      className={className}
    >
      {(mode === 'polygon' || mode === 'freeLine') && (
        <PolylineDrawer polygon={polygon} />
      )}
      {mode === 'line' && <LineDrawer line={polygon} />}
    </svg>
  )
}
