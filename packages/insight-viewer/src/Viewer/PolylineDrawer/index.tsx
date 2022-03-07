import React, { ReactElement } from 'react'

import { useOverlayContext } from '../../contexts'
import { PolylineDrawerProps } from './PolylineDrawer.types'
import { polyline } from '../AnnotationDrawer/AnnotationDrawer.styles'
import { getArrowPosition } from '../../utils/common/getArrowPosition'

export function PolylineDrawer({
  polygon,
  mode,
}: PolylineDrawerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  if (mode === 'arrowLine') {
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
          <polyline style={polyline.default} points={polygonPoints} />
          <polyline style={polyline.highlight} points={polygonPoints} />
        </>
      )}
    </>
  )
}
