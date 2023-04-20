import React, { ReactElement } from 'react'
import polylabel from 'polylabel'

import { PolylineDrawerProps } from './PolylineDrawer.types'
import { svgWrapperStyle } from '../Viewer.styles'
import { textStyle } from '../Viewer.styles'
import { getArrowPosition } from '../../utils/common/getArrowPosition'
import { useOverlayContext } from '../../contexts'

const PolylineElement = ({
  isPolygon,
  ...rest
}: React.SVGProps<SVGPolygonElement | SVGPolylineElement> & { isPolygon: boolean }) =>
  isPolygon ? <polygon {...rest} /> : <polyline {...rest} />

export function PolylineDrawer({
  annotation,
  isSelectedMode,
  selectedAnnotationLabel,
  showAnnotationLabel,
  isPolygonSelected,
  setAnnotationEditMode,
  cursorStatus,
}: PolylineDrawerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const { points, type } = annotation

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
  const cursorClassName = cursorStatus === null ? 'pointer' : ''

  return (
    <g data-cy-annotation onMouseDown={() => setAnnotationEditMode('move')}>
      {points && points.length > 0 && (
        <>
          <PolylineElement isPolygon={isPolygonSelected} style={svgWrapperStyle.outline} points={polylinePoints} />
          {type === 'arrowLine' && (
            <>
              <PolylineElement
                className={`annotation-polyline ${cursorClassName} `}
                isPolygon={isPolygonSelected}
                style={svgWrapperStyle.outline}
                points={getArrowPoints()}
              />
              <PolylineElement
                className={`annotation-polyline ${cursorClassName}`}
                isPolygon={isPolygonSelected}
                style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
                points={getArrowPoints()}
              />
            </>
          )}
          <PolylineElement
            className={`annotation-polyline ${cursorClassName}`}
            isPolygon={isPolygonSelected}
            style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
            points={polylinePoints}
          />
          <PolylineElement
            className={`annotation-polyline ${cursorClassName}`}
            isPolygon={isPolygonSelected}
            style={svgWrapperStyle.extendsArea}
            points={polylinePoints}
          />
        </>
      )}
      {showAnnotationLabel && selectedAnnotationLabel && labelPosition && (
        <text
          className={`annotation-polyline label ${cursorClassName}`}
          style={{ ...textStyle.default }}
          x={labelPosition[0]}
          y={labelPosition[1]}
        >
          {selectedAnnotationLabel}
        </text>
      )}
    </g>
  )
}
