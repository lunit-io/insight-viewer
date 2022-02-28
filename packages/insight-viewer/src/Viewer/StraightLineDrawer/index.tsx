import React, { ReactElement } from 'react'

import { useOverlayContext } from '../../contexts'
import { StraightLineDrawerProps } from './StraightLineDrawer.types'
import { polyline } from '../AnnotationDrawer/AnnotationDrawer.styles'

export function StraightLineDrawer({
  polygon,
}: StraightLineDrawerProps): ReactElement {
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
          <polyline style={polyline.default} points={polygonPoints} />
          <polyline style={polyline.highlight} points={polygonPoints} />
        </>
      )}
    </>
  )
}
