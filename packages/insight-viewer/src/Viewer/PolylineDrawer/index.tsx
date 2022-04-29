import React, { ReactElement } from 'react'

import { PolylineDrawerProps } from './PolylineDrawer.types'
import { polyline } from '../AnnotationDrawer/AnnotationDrawer.styles'
import { getArrowPosition } from '../../utils/common/getArrowPosition'
import { useOverlayContext } from '../../contexts'

export function PolylineDrawer({ mode, lineHead, points }: PolylineDrawerProps): ReactElement {
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
          {lineHead === 'arrow' && <polyline style={polyline.default} points={getArrowPoints()} />}
          <polyline
            style={mode === 'freeLine' ? { ...polyline.default, fill: 'transparent' } : polyline.default}
            points={polylinePoints}
          />
          <polyline style={polyline.highlight} points={polylinePoints} />
        </>
      )}
    </>
  )
}
