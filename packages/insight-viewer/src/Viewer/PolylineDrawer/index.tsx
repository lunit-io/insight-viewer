import React, { ReactElement } from 'react'

import { PolylineDrawerProps } from './PolylineDrawer.types'
import { polyline } from '../AnnotationDrawer/AnnotationDrawer.styles'
import { getArrowPosition } from '../../utils/common/getArrowPosition'
import { useOverlayContext } from '../../contexts'

export function PolylineDrawer({
  lineHead,
  points,
  isSelectedMode,
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

  const closingPoints = points
    .filter((_, index) => {
      if (index === 0 || index === points.length - 1) {
        return true
      }
      return false
    })
    .map(point => pixelToCanvas(point))

  return (
    <>
      {points && points.length > 0 && (
        <>
          <polyline
            style={polyline.outline}
            onMouseDown={() => setAnnotationEditMode('move')}
            points={polylinePoints}
          />
          {lineHead === 'arrow' && (
            <polyline
              style={polyline[isSelectedMode ? 'select' : 'default']}
              onMouseDown={() => setAnnotationEditMode('move')}
              points={getArrowPoints()}
            />
          )}
          <polyline
            style={polyline[isSelectedMode ? 'select' : 'default']}
            onMouseDown={() => setAnnotationEditMode('move')}
            points={polylinePoints}
          />
          {isSelectedMode && (
            <>
              <line
                style={polyline.outline}
                x1={closingPoints[0][0]}
                y1={closingPoints[0][1]}
                x2={closingPoints[1][0]}
                y2={closingPoints[1][1]}
                onMouseDown={() => setAnnotationEditMode('move')}
              />
              <line
                style={polyline.select}
                x1={closingPoints[0][0]}
                y1={closingPoints[0][1]}
                x2={closingPoints[1][0]}
                y2={closingPoints[1][1]}
                onMouseDown={() => setAnnotationEditMode('move')}
              />
            </>
          )}
        </>
      )}
    </>
  )
}
