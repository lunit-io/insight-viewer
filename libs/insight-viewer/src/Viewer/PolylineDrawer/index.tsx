import React, { ReactElement } from 'react'
import polylabel from 'polylabel'

import { PolylineDrawerProps } from './PolylineDrawer.types'
import { viewerStyle } from '../Viewer.styled'
import { textStyle } from '../Viewer.styled'
import { getArrowPosition } from '../../utils/common/getArrowPosition'
import { useOverlayContext } from '../../contexts'

const PolylineElement = ({
  isPolygon,
  ...rest
}: React.SVGProps<SVGPolygonElement | SVGPolylineElement> & { isPolygon: boolean }) =>
  isPolygon ? <polygon {...rest} /> : <polyline {...rest} />

export function PolylineDrawer({
  annotation,
  lineHead,
  isSelectedMode,
  selectedAnnotationLabel,
  isPolygonSelected,
  setAnnotationEditMode,
}: PolylineDrawerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const { points } = annotation

  const canvasPoints = points.map(pixelToCanvas)

  const polylinePoints = canvasPoints
    .map((point) => {
      const [x, y] = point
      return `${x},${y}`
    })
    .join()

  const getArrowPoints = () => {
    const arrowPosition = getArrowPosition(canvasPoints)
    const arrowPoints = arrowPosition
      .map((point) => {
        const [x, y] = point
        return `${x},${y}`
      })
      .join()

    return arrowPoints
  }

  const labelPosition = selectedAnnotationLabel ? polylabel([points.map(pixelToCanvas)]) : null

  return (
    <g data-cy-annotation onMouseDown={() => setAnnotationEditMode('move')}>
      {points && points.length > 0 && (
        <>
          <PolylineElement isPolygon={!!isPolygonSelected} style={viewerStyle.outline} points={polylinePoints} />
          {lineHead === 'arrow' && (
            <>
              <PolylineElement isPolygon={!!isPolygonSelected} style={viewerStyle.outline} points={getArrowPoints()} />
              <PolylineElement
                isPolygon={!!isPolygonSelected}
                style={viewerStyle[isSelectedMode ? 'select' : 'default']}
                points={getArrowPoints()}
              />
            </>
          )}
          <PolylineElement
            isPolygon={!!isPolygonSelected}
            style={viewerStyle[isSelectedMode ? 'select' : 'default']}
            points={polylinePoints}
          />
          <PolylineElement isPolygon={!!isPolygonSelected} style={viewerStyle.extendsArea} points={polylinePoints} />
        </>
      )}
      {selectedAnnotationLabel && labelPosition && (
        <text style={{ ...textStyle.default }} x={labelPosition[0]} y={labelPosition[1]}>
          {selectedAnnotationLabel}
        </text>
      )}
    </g>
  )
}
