import React, { ReactElement } from 'react'

import { RulerDrawerProps } from './RulerDrawer.types'
import { polyline, textStyle } from './RulerDrawer.styles'
import { RULER_TEXT_POSITION_SPACING } from '../../const'
import { useOverlayContext } from '../../contexts'
import { getLineLength } from '../../utils/common/getLineLength'

export function RulerDrawer({ points, setEditTargetPoint }: RulerDrawerProps): ReactElement | null {
  const { image, pixelToCanvas } = useOverlayContext()

  const [startPoint, endPoint] = points
  const [endPointX, endPointY] = pixelToCanvas(endPoint)

  const linePoints = points
    .map(point => {
      const [x, y] = pixelToCanvas(point)
      return `${x},${y}`
    })
    .join(' ')
  const lineLength = image ? `${getLineLength(startPoint, endPoint, image)?.toFixed(2)}mm` : null

  return (
    <>
      {points && points.length > 0 && image ? (
        <>
          <polyline onMouseDown={() => setEditTargetPoint('line')} style={polyline.default} points={linePoints} />
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
