/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { circleStyle } from './CircleDrawer.styles'
import { CircleDrawerProps } from './CircleDrawer.types'
import { getCircleRadius } from '../../utils/common/getCircleRadius'

export function CircleDrawer({ points, setMeasurementEditMode }: CircleDrawerProps): ReactElement | null {
  const radius = getCircleRadius(points)
  const [cx, cy] = points[0]

  return (
    <>
      <circle
        onMouseDown={() => setMeasurementEditMode('line')}
        style={circleStyle.default}
        cx={cx}
        cy={cy}
        r={radius}
      />
    </>
  )
}
