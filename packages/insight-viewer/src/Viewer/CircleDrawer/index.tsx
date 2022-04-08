/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { circleStyle, textStyle } from './CircleDrawer.styles'
import { CircleDrawerProps } from './CircleDrawer.types'
import { getCircleRadius } from '../../utils/common/getCircleRadius'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { CIRCLE_TEXT_POSITION_SPACING } from '../../const'

export function CircleDrawer({ points, setMeasurementEditMode }: CircleDrawerProps): ReactElement | null {
  const radius = getCircleRadius(points)
  const textPosition = getCircleTextPosition(points[0], radius)

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
      <text
        style={{ ...textStyle.default }}
        x={textPosition[0] + CIRCLE_TEXT_POSITION_SPACING.x}
        y={textPosition[1] + CIRCLE_TEXT_POSITION_SPACING.y}
      >
        {`radius: ${radius.toFixed(2)}mm`}
      </text>
    </>
  )
}
