import React, { ReactElement } from 'react'

import { RulerViewerProps } from './RulerViewer.types'
import { textStyle, polylineStyle } from '../MeasurementViewer/MeasurementViewer.styles'
import { RULER_TEXT_POSITION_SPACING } from '../../const'
import { useOverlayContext } from '../../contexts'

export function RulerViewer({ measurement, hoveredMeasurement }: RulerViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const { id, points, length } = measurement
  const canvasPoints = points.map(pixelToCanvas)

  const poygonPoints: string = canvasPoints
    .map(point => {
      const [x, y] = point
      return `${x},${y}`
    })
    .join(' ')
  const [endPointX, endPointY] = canvasPoints[1]
  const isHoveredMeasurement = measurement === hoveredMeasurement

  return (
    <>
      <polyline
        data-cy-id={id}
        style={{
          ...polylineStyle[isHoveredMeasurement ? 'hover' : 'default'],
        }}
        data-select={isHoveredMeasurement || undefined}
        points={poygonPoints}
      />
      {length && (
        <text
          style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }}
          x={endPointX + RULER_TEXT_POSITION_SPACING.x}
          y={endPointY + RULER_TEXT_POSITION_SPACING.y}
        >
          {length}mm
        </text>
      )}
    </>
  )
}
