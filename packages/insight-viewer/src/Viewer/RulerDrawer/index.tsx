import React, { ReactElement } from 'react'

import { RulerDrawerProps } from './RulerDrawer.types'
import { polyline, textStyle } from './RulerDrawer.styles'

export function RulerDrawer({ measurement, setMeasurementEditMode }: RulerDrawerProps): ReactElement | null {
  const { textPoint, linePoints, length } = measurement

  return (
    <>
      <polyline onMouseDown={() => setMeasurementEditMode('move')} style={polyline.default} points={linePoints} />
      <text style={{ ...textStyle.default }} x={textPoint[0]} y={textPoint[1]}>
        {`${length}mm`}
      </text>
    </>
  )
}
