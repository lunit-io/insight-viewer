/* eslint-disable no-restricted-properties */
import React, { ReactElement } from 'react'

import { circleStyle, textStyle } from './CircleDrawer.styles'
import { CircleDrawerProps } from './CircleDrawer.types'
import { getCircleRadius } from '../../utils/common/getCircleRadius'
import { getLineLengthWithoutImage } from '../../utils/common/getLineLengthWithoutImage'
import { useOverlayContext } from '../../contexts'

export function CircleDrawer({ points, textPoint, setMeasurementEditMode }: CircleDrawerProps): ReactElement | null {
  const { image, pixelToCanvas } = useOverlayContext()

  const [startPoint, endPoint] = points.map(pixelToCanvas)
  const [textPointX, textPointY] = pixelToCanvas(textPoint)
  const radius = getCircleRadius(points, image)

  const drawingRadius = getLineLengthWithoutImage(startPoint, endPoint)
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
      <text style={{ ...textStyle.default }} x={textPointX} y={textPointY}>
        {`radius: ${radius.toFixed(2)}mm`}
      </text>
    </>
  )
}
