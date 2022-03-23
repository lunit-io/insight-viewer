import React, { ReactElement } from 'react'

import { RulerViewerProps } from './RulerViewer.types'
import { textStyle, polylineStyle } from '../MeasurementViewer/MeasurementViewer.styles'
import { RULER_TEXT_POSITION_SPACING } from '../../const'

export function RulerViewer({ measurement, selectedMeasurement, pixelToCanvas }: RulerViewerProps): ReactElement {
  const { id, length, points } = measurement
  const [endPointX, endPointY] = pixelToCanvas(points[1])
  const isSelectedMeasurement = measurement === selectedMeasurement

  const polygonPoints: string = points
    .map(point => {
      const [x, y] = pixelToCanvas(point)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <>
      <polyline
        data-cy-id={id}
        style={{
          ...polylineStyle[isSelectedMeasurement ? 'select' : 'default'],
        }}
        data-select={isSelectedMeasurement || undefined}
        points={polygonPoints}
      />
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
