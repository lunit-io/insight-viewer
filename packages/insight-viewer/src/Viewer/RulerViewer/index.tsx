import React, { ReactElement } from 'react'

import { RulerViewerProps } from './RulerViewer.types'
import { textStyle, polylineStyle } from '../MeasurementViewer/MeasurementViewer.styles'
import { RULER_TEXT_POSITION_SPACING } from '../../const'

export function RulerViewer({ measurement, hoveredMeasurement }: RulerViewerProps): ReactElement {
  const { id, length, points } = measurement
  const [endPointX, endPointY] = points[1]
  const isHoveredMeasurement = measurement === hoveredMeasurement

  const polygonPoints: string = points
    .map(point => {
      const [x, y] = point
      return `${x},${y}`
    })
    .join(' ')

  return (
    <>
      <polyline
        data-cy-id={id}
        style={{
          ...polylineStyle[isHoveredMeasurement ? 'hover' : 'default'],
        }}
        data-select={isHoveredMeasurement || undefined}
        points={polygonPoints}
      />
      {length && (
        <text
          style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }}
          x={endPointX + RULER_TEXT_POSITION_SPACING.x}
          y={endPointY + RULER_TEXT_POSITION_SPACING.y}
        >
          {`${length}mm`}
        </text>
      )}
    </>
  )
}
