import React, { ReactElement } from 'react'

import { useOverlayContext } from '../../contexts'
import { PolylineDrawerProps } from './PolylineDrawer.types'
import { polyline } from '../AnnotationDrawer/AnnotationDrawer.styles'
import { getArrowPosition } from '../../utils/common/getArrowPosition'

export function PolylineDrawer({ mode, polygon }: PolylineDrawerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const polylinePoints = polygon
    .map(point => {
      const [x, y] = pixelToCanvas(point)
      return `${x},${y}`
    })
    .join()

  const getArrowPoints = () => {
    const arrowPosition = getArrowPosition(polygon)
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
      {polygon && polygon.length > 0 && (
        <>
          {mode === 'arrowLine' && <polyline style={polyline.default} points={getArrowPoints()} />}
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
