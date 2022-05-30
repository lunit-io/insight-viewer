import React, { ReactElement } from 'react'

import { RulerDrawerProps } from './RulerDrawer.types'
import { polyline, textStyle } from './RulerDrawer.styles'
import { RULER_TEXT_POSITION_SPACING } from '../../const'
import { useOverlayContext } from '../../contexts'
import { getLineLength } from '../../utils/common/getLineLength'

export function RulerDrawer({ points, setMeasurementEditMode }: RulerDrawerProps): ReactElement | null {
  const { image, pixelToCanvas } = useOverlayContext()

  const canvasPoints = points.map(pixelToCanvas)
  const [endPointX, endPointY] = canvasPoints[1]
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
          <text
            style={{ ...textStyle.default }}
            x={endPointX + RULER_TEXT_POSITION_SPACING.x}
            y={endPointY + RULER_TEXT_POSITION_SPACING.y}
          >
            {lineLength}
          </text>
        </>
      ) : null}
    </>
  )
}
