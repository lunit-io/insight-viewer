/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { circleStyle, textStyle } from './CircleDrawer.styles'
import { CircleDrawerProps } from './CircleDrawer.types'

export function CircleDrawer({ measurement, setMeasurementEditMode }: CircleDrawerProps): ReactElement | null {
  const { center, radius, textPoint, drawingRadius } = measurement

  return (
    <>
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={circleStyle.default}
        cx={center[0]}
        cy={center[1]}
        r={drawingRadius}
      />
      <text style={{ ...textStyle.default }} x={textPoint[0]} y={textPoint[1]}>
        {`radius: ${radius.toFixed(2)}mm`}
      </text>
    </>
  )
}
