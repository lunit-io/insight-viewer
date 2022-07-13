import React, { ReactElement } from 'react'

import { circleStyle, textStyle } from './CircleDrawer.styles'
import { CircleDrawerProps } from './CircleDrawer.types'

import { getCircleTextPosition } from '../../utils/common/getCircleTextPosition'
import { useOverlayContext } from '../../contexts'

export function CircleDrawer({
  isSelectedMode,
  measurement,
  setMeasurementEditMode,
}: CircleDrawerProps): ReactElement | null {
  const { pixelToCanvas } = useOverlayContext()

  const { center, radius, textPoint, drawingRadius } = measurement

  const [textPointX, textPointY] = textPoint ? pixelToCanvas(textPoint) : getCircleTextPosition(center, drawingRadius)

  return (
    <>
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={circleStyle.outline}
        cx={center[0]}
        cy={center[1]}
        r={drawingRadius}
      />
      <circle
        onMouseDown={() => setMeasurementEditMode('move')}
        style={circleStyle[isSelectedMode ? 'select' : 'default']}
        cx={center[0]}
        cy={center[1]}
        r={drawingRadius}
      />
      <text
        onMouseDown={() => setMeasurementEditMode('textMove')}
        style={{ ...textStyle[isSelectedMode ? 'select' : 'default'] }}
        x={textPointX}
        y={textPointY}
      >
        {`radius: ${radius.toFixed(2)}mm`}
      </text>
    </>
  )
}
