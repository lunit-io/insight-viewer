import React, { ReactElement } from 'react'

import { RulerDrawerProps } from './RulerDrawer.types'
import { polyline, textStyle } from './RulerDrawer.styles'

import { getRulerTextPosition } from '../../utils/common/getRulerTextPosition'
import { useOverlayContext } from '../../contexts'

export function RulerDrawer({
  measurement,
  isSelectedMode,
  setMeasurementEditMode,
}: RulerDrawerProps): ReactElement | null {
  const { pixelToCanvas } = useOverlayContext()

  const { textPoint, points, linePoints, length } = measurement

  const [textPointX, textPointY] = pixelToCanvas(textPoint ?? getRulerTextPosition(points[1]))

  return (
    <>
      <polyline onMouseDown={() => setMeasurementEditMode('move')} style={polyline.outline} points={linePoints} />
      <polyline
        onMouseDown={() => setMeasurementEditMode('move')}
        style={polyline[isSelectedMode ? 'select' : 'default']}
        points={linePoints}
      />
      <text
        onMouseDown={() => setMeasurementEditMode('textMove')}
        style={{ ...textStyle[isSelectedMode ? 'select' : 'default'] }}
        x={textPointX}
        y={textPointY}
      >
        {length}mm
      </text>
    </>
  )
}
