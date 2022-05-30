/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { circleStyle, textStyle } from './CircleDrawer.styles'
import { CircleDrawerProps } from './CircleDrawer.types'
import { getCircleRadius } from '../../utils/common/getCircleRadius'
import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { getLineLengthWithoutImage } from '../../utils/common/getLineLengthWithoutImage'
import { CIRCLE_TEXT_POSITION_SPACING } from '../../const'
import { useOverlayContext } from '../../contexts'

export function CircleDrawer({ points, setMeasurementEditMode }: CircleDrawerProps): ReactElement | null {
  const { image, pixelToCanvas } = useOverlayContext()

  const [startPoint, endPoint] = points.map(pixelToCanvas)
  const radius = getCircleRadius(points, image)
  const drawingRadius = getLineLengthWithoutImage(startPoint, endPoint)
  const textPosition = getCircleTextPosition(startPoint, drawingRadius)
  const [cx, cy] = startPoint

  return (
    <>
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={circleStyle.default}
        cx={cx}
        cy={cy}
        r={drawingRadius}
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
