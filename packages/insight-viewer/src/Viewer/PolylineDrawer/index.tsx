import React, { ReactElement } from 'react'

import { PolylineDrawerProps } from './PolylineDrawer.types'
import { polyline } from '../AnnotationDrawer/AnnotationDrawer.styles'
import { getArrowPosition } from '../../utils/common/getArrowPosition'
import { useOverlayContext } from '../../contexts'

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

  const PolylineElement = (props: React.SVGProps<SVGPolygonElement | SVGPolylineElement>) =>
    isPolygonSelected ? <polygon {...props} /> : <polyline {...props} />

  return (
    <>
      {points && points.length > 0 && (
        <>
          <PolylineElement
            style={polyline.outline}
            onMouseDown={() => setAnnotationEditMode('move')}
            points={polylinePoints}
          />
          {lineHead === 'arrow' && (
            <PolylineElement
              style={polyline[isSelectedMode ? 'select' : 'default']}
              onMouseDown={() => setAnnotationEditMode('move')}
              points={getArrowPoints()}
            />
          )}
          <PolylineElement
            style={polyline[isSelectedMode ? 'select' : 'default']}
            onMouseDown={() => setAnnotationEditMode('move')}
            points={polylinePoints}
          />
        </>
      )}
    </>
  )
}
