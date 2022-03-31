import React, { ReactElement } from 'react'

import { CircleViewerProps } from './CircleViewer.types'
import { circleStyle } from './CircleViewer.styles'

export function CircleViewer({ measurement, hoveredMeasurement }: CircleViewerProps): ReactElement {
  const { id, center, radius } = measurement
  const [centerX, centerY] = center
  const isHoveredMeasurement = measurement === hoveredMeasurement

  return (
    <>
      <circle
        data-cy-id={id}
        style={{
          ...circleStyle[isHoveredMeasurement ? 'hover' : 'default'],
        }}
        data-focus={isHoveredMeasurement || undefined}
        cx={centerX}
        cy={centerY}
        r={radius}
      />
    </>
  )
}
