import React, { ReactElement } from 'react'

import { CircleViewerProps } from './CircleViewer.types'
import { circleStyle, textStyle } from './CircleViewer.styles'
import { CIRCLE_TEXT_POSITION_SPACING } from '../../const'

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
      <text
        style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }}
        x={centerX + radius + CIRCLE_TEXT_POSITION_SPACING.x}
        y={centerY}
      >
        {`radius: ${radius.toFixed(2)}`}
      </text>
    </>
  )
}
