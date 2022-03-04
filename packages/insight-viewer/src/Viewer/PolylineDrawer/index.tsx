import React, { ReactElement } from 'react'

import { useOverlayContext } from '../../contexts'
import { PolylineDrawerProps } from './PolylineDrawer.types'
import { polyline } from '../AnnotationDrawer/AnnotationDrawer.styles'

export function PolylineDrawer({
  mode,
  polygon,
}: PolylineDrawerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const polygonPoints = polygon
    .map(point => {
      const [x, y] = pixelToCanvas(point)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <>
      {polygon && polygon.length > 0 && (
        <>
          <polyline
            style={
              mode === 'freeLine'
                ? { ...polyline.default, fill: 'transparent' }
                : polyline.default
            }
            points={polygonPoints}
          />
          <polyline style={polyline.highlight} points={polygonPoints} />
        </>
      )}
    </>
  )
}
