import React, { ReactElement } from 'react'

import { RulerDrawerProps } from './RulerDrawer.types'
import { polyline, textStyle } from './RulerDrawer.styles'

export function RulerDrawer({
  measurement,
  isSelectedMode,
  setMeasurementEditMode,
}: RulerDrawerProps): ReactElement | null {
  const { textPoint, linePoints, length } = measurement

  return (
    <>
      <polyline onMouseDown={() => setMeasurementEditMode('move')} style={polyline.outline} points={linePoints} />
      <polyline
        onMouseDown={() => setMeasurementEditMode('move')}
        style={polyline[isSelectedMode ? 'select' : 'default']}
        points={linePoints}
      />
      <text style={{ ...textStyle[isSelectedMode ? 'select' : 'default'] }} x={textPoint[0]} y={textPoint[1]}>
        {`${length}mm`}
      </text>
    </>
  )
}
