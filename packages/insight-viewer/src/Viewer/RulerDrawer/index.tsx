import React, { ReactElement } from 'react'

import { RulerDrawerProps } from './RulerDrawer.types'
import { polyline, textStyle } from './RulerDrawer.styles'
import { useOverlayContext } from '../../contexts'
import { getLineLength } from '../../utils/common/getLineLength'

export function RulerDrawer({ rulerPoints, textPoint, setMeasurementEditMode }: RulerDrawerProps): ReactElement | null {
  const { image, pixelToCanvas } = useOverlayContext()

  const canvasPoints = rulerPoints.map(pixelToCanvas)
  const [textPointX, textPointY] = pixelToCanvas(textPoint)

  const linePoints = canvasPoints
    .map(point => {
      const [x, y] = point
      return `${x},${y}`
    })
    .join(' ')
  const lineLength = image ? `${getLineLength(rulerPoints[0], rulerPoints[1], image)?.toFixed(2)}mm` : null

  return (
    <>
      {canvasPoints && canvasPoints.length > 0 && image ? (
        <>
          <polyline onMouseDown={() => setMeasurementEditMode('move')} style={polyline.default} points={linePoints} />
          <text style={{ ...textStyle.default }} x={textPointX} y={textPointY}>
            {lineLength}
          </text>
        </>
      ) : null}
    </>
  )
}
