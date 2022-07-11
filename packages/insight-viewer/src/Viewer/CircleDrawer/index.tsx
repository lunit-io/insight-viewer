import React, { ReactElement } from 'react'

import { circleStyle, textStyle, polyline } from './CircleDrawer.styles'
import { CircleDrawerProps } from './CircleDrawer.types'

export function CircleDrawer({
  isSelectedMode,
  measurement,
  setMeasurementEditMode,
}: CircleDrawerProps): ReactElement | null {
  const { center, radius, textPoint, connectingPoints, drawingRadius } = measurement

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
        x={textPoint[0]}
        y={textPoint[1]}
      >
        {`radius: ${radius.toFixed(2)}mm`}
      </text>
      <polyline style={polyline.dashLine} points={connectingPoints} />
    </>
  )
}
