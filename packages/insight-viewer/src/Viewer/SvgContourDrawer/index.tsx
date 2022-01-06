/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from 'react'
import { useOverlayContext } from '../../contexts'
import { Contour, Point } from '../../types'
import { svgStyle, polyline } from './SvgContourDrawer.styles'
import { SvgContourDrawerProps } from './SvgContourDrawer.types'
import useSvgContourDrawing from '../../hooks/useSvgContourDrawing'

export function SvgContourDrawer<T extends Contour>({
  style,
  width,
  height,
  device,
  contours,
  className,
  onAdd,
  onFocus,
  onRemove,
}: SvgContourDrawerProps<T>): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const [polygon] = useSvgContourDrawing({
    svgElement: svgRef,
    device,
    contours,
    onAdd,
    onFocus,
    onRemove,
  })
  const { pixelToCanvas } = useOverlayContext()

  const transformedPoints: Point[] = polygon.map(point => pixelToCanvas(point))
  const polygonPoints = transformedPoints.map(([x, y]) => `${x},${y}`).join(' ')

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ ...svgStyle.default, ...style }}
      className={className}
    >
      {polygon && polygon.length > 0 && (
        <>
          <polyline style={polyline.default} points={polygonPoints} />
          <polyline style={polyline.highlight} points={polygonPoints} />
        </>
      )}
    </svg>
  )
}
