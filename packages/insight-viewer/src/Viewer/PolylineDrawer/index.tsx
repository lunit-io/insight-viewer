import React, { ReactElement } from 'react'

import { PolylineDrawerProps } from './PolylineDrawer.types'
import { polyline } from '../AnnotationDrawer/AnnotationDrawer.styles'
import { getArrowPosition } from '../../utils/common/getArrowPosition'
import { useOverlayContext } from '../../contexts'

const PolylineElement = ({
  isPolygon,
  ...rest
}: React.SVGProps<SVGPolygonElement | SVGPolylineElement> & { isPolygon: boolean }) =>
  isPolygon ? <polygon {...rest} /> : <polyline {...rest} />

export function PolylineDrawer({
  lineHead,
  points,
  isSelectedMode,
  isPolygonSelected,
  setAnnotationEditMode,
}: PolylineDrawerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const polylinePoints = points
    .map(point => {
      const [x, y] = pixelToCanvas(point)
      return `${x},${y}`
    })
    .join()

  const getArrowPoints = () => {
    const arrowPosition = getArrowPosition(points)
    const arrowPoints = arrowPosition
      .map(point => {
        const [x, y] = pixelToCanvas(point)
        return `${x},${y}`
      })
      .join()

    return arrowPoints
  }

  return (
    <>
      {points && points.length > 0 && (
        <>
          <PolylineElement
            isPolygon={!!isPolygonSelected}
            style={polyline.outline}
            onMouseDown={() => setAnnotationEditMode('move')}
            points={polylinePoints}
          />
          {lineHead === 'arrow' && (
            <PolylineElement
              isPolygon={!!isPolygonSelected}
              style={polyline[isSelectedMode ? 'select' : 'default']}
              onMouseDown={() => setAnnotationEditMode('move')}
              points={getArrowPoints()}
            />
          )}
          <PolylineElement
            isPolygon={!!isPolygonSelected}
            style={polyline[isSelectedMode ? 'select' : 'default']}
            onMouseDown={() => setAnnotationEditMode('move')}
            points={polylinePoints}
          />
        </>
      )}
    </>
  )
}
