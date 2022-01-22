import React, { useRef } from 'react'
import { useOverlayContext } from '../../contexts'
import { Contour, Point } from '../../types'
import { svgStyle, textStyle, polygonStyle } from './SvgContourViewer.styles'
import {
  SvgContoursDrawProps,
  SvgContourViewerProps,
} from './SvgContourViewer.types'

function svgContoursDraw<T extends Contour>({
  contours,
  showOutline,
  showPolygonLabel,
  focusedContour,
  polygonAttrs,
  pixelToCanvas,
}: SvgContoursDrawProps<T>) {
  return contours.map(contour => {
    const { polygon, label, id, labelPosition: _labelPosition } = contour
    const isFocusedPolygon = polygon === focusedContour?.polygon
    const transformedPoints: Point[] = polygon.map(pixelToCanvas)

    const polygonAttributes =
      typeof polygonAttrs === 'function'
        ? polygonAttrs(contour, showOutline)
        : undefined

    const labelPosition = _labelPosition
      ? pixelToCanvas(_labelPosition)
      : undefined
    const polygonPoints = transformedPoints
      .map(([x, y]) => `${x},${y}`)
      .join(' ')
    const polygonLabel = label ?? id

    return (
      <React.Fragment key={id}>
        {showOutline && (
          <polygon
            data-cy-id={polygonLabel}
            style={{
              ...polygonStyle[isFocusedPolygon ? 'focus' : 'outline'],
              ...polygonAttributes?.style,
            }}
            data-focus={isFocusedPolygon || undefined}
            points={polygonPoints}
          />
        )}
        <polygon
          data-cy-id={polygonLabel}
          style={{
            ...polygonStyle[isFocusedPolygon ? 'focus' : 'default'],
            ...polygonAttributes?.style,
          }}
          data-focus={isFocusedPolygon || undefined}
          points={polygonPoints}
        />
        {showPolygonLabel && labelPosition && (
          <text
            style={{ ...textStyle[isFocusedPolygon ? 'focus' : 'default'] }}
            x={labelPosition[0]}
            y={labelPosition[1]}
          >
            {polygonLabel}
          </text>
        )}
      </React.Fragment>
    )
  })
}

export function SvgContourViewer<T extends Contour>({
  style,
  width,
  height,
  contours,
  className,
  focusedContour,
  showOutline = false,
  showPolygonLabel = false,
  polygonAttrs,
}: SvgContourViewerProps<T>): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const { pixelToCanvas, enabledElement } = useOverlayContext()

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ ...svgStyle.default, ...style }}
      className={className}
    >
      {contours.length === 0 || !enabledElement
        ? null
        : svgContoursDraw({
            showOutline,
            showPolygonLabel,
            contours,
            focusedContour,
            pixelToCanvas,
            polygonAttrs,
          })}
    </svg>
  )
}
