import React, { ReactElement } from 'react'

import { RulerViewerProps } from './RulerViewer.types'
import { textStyle, polylineStyle } from '../MeasurementViewer/MeasurementViewer.styles'
import { RULER_TEXT_POSITION_SPACING } from '../../const'

export function RulerViewer({
  measurement,
  showMeasurementLabel,
  selectedMeasurement,
  pixelToCanvas,
}: RulerViewerProps): ReactElement {
  const { id, label, length, points, labelPosition: _labelPosition } = measurement
  const [endPointX, endPointY] = pixelToCanvas(points[1])
  const isSelectedMeasurement = measurement === selectedMeasurement
  const rulerLabel = label ?? id

  const labelPosition = _labelPosition ? pixelToCanvas(_labelPosition) : undefined
  const polygonPoints: string = points
    .map(point => {
      const [x, y] = pixelToCanvas(point)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <>
      <polyline
        data-cy-id={rulerLabel}
        style={{
          ...polylineStyle[isSelectedMeasurement ? 'select' : 'default'],
        }}
        data-select={isSelectedMeasurement || undefined}
        points={polygonPoints}
      />
      {showMeasurementLabel && labelPosition && (
        <text
          style={{ ...textStyle[isSelectedMeasurement ? 'select' : 'default'] }}
          x={labelPosition[0] + RULER_TEXT_POSITION_SPACING.x}
          y={labelPosition[1] - RULER_TEXT_POSITION_SPACING.y}
        >
          {rulerLabel}
        </text>
      )}
      {length && (
        <text
          style={{ ...textStyle[isSelectedMeasurement ? 'select' : 'default'] }}
          x={endPointX + RULER_TEXT_POSITION_SPACING.x}
          y={endPointY + RULER_TEXT_POSITION_SPACING.y}
        >
          {`${length}mm`}
        </text>
      )}
    </>
  )
}
