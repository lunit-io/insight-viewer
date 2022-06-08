/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { circleStyle, textStyle } from './CircleDrawer.styles'
import { CircleDrawerProps } from './CircleDrawer.types'
import { getCircleRadius } from '../../utils/common/getCircleRadius'
import { getLineLengthWithoutImage } from '../../utils/common/getLineLengthWithoutImage'
import { useOverlayContext } from '../../contexts'

export function CircleDrawer({
  points,
  canvasPoints,
  textPoint,
  setMeasurementEditMode,
}: CircleDrawerProps): ReactElement | null {
  const { image } = useOverlayContext()

  const [cx, cy] = canvasPoints[0]

  const radius = getCircleRadius(points, image)
  const drawingRadius = getLineLengthWithoutImage(canvasPoints[0], canvasPoints[1])

  return (
    <>
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={circleStyle.default}
        cx={cx}
        cy={cy}
        r={drawingRadius}
      />
      <text style={{ ...textStyle.default }} x={textPoint[0]} y={textPoint[1]}>
        {`radius: ${radius.toFixed(2)}mm`}
      </text>
    </>
  )
}
