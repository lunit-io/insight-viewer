import React, { ReactElement } from 'react'

import { useOverlayContext } from '../../contexts'
import { PolylineDrawerProps } from './PolylineDrawer.types'
import { polyline } from '../AnnotationDrawer/AnnotationDrawer.styles'
import { getArrowPosition } from '../../utils/common/getArrowPosition'

export function PolylineDrawer({ mode, polygon, head }: PolylineDrawerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  if (head === 'arrow') {
    polygon.splice(1, 0, ...getArrowPosition(polygon))
  }

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
            style={mode === 'freeLine' ? { ...polyline.default, fill: 'transparent' } : polyline.default}
            points={polygonPoints}
          />
          <polyline style={polyline.highlight} points={polygonPoints} />
        </>
      )}
    </>
  )
}
