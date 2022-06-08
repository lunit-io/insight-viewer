import React, { ReactElement } from 'react'

import { RulerDrawerProps } from './RulerDrawer.types'
import { polyline, textStyle } from './RulerDrawer.styles'
import { useOverlayContext } from '../../contexts'
import { getLineLength } from '../../utils/common/getLineLength'

export function RulerDrawer({
  points,
  textPoint,
  canvasPoints,
  setMeasurementEditMode,
}: RulerDrawerProps): ReactElement | null {
  const { image } = useOverlayContext()

  const linePoints = canvasPoints
    .map(point => {
      const [x, y] = point
      return `${x},${y}`
    })
    .join(' ')
  const lineLength = image ? `${getLineLength(points[0], points[1], image)?.toFixed(2)}mm` : null

  return (
    <>
      {canvasPoints && canvasPoints.length > 0 && image ? (
        <>
          <polyline onMouseDown={() => setMeasurementEditMode('move')} style={polyline.default} points={linePoints} />
          <text style={{ ...textStyle.default }} x={textPoint[0]} y={textPoint[1]}>
            {lineLength}
          </text>
        </>
      ) : null}
    </>
  )
}
