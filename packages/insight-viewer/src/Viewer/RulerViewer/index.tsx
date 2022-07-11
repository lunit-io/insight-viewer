import React, { ReactElement } from 'react'

import { RulerViewerProps } from './RulerViewer.types'
import { textStyle, polylineStyle } from '../MeasurementViewer/MeasurementViewer.styles'

import { useOverlayContext } from '../../contexts'

export function RulerViewer({ measurement, hoveredMeasurement }: RulerViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const { id, points, length, textPoint, connectingLine } = measurement

  const canvasPoints = points.map(pixelToCanvas)

  const poygonPoints: string = canvasPoints
    .map(point => {
      const [x, y] = point
      return `${x},${y}`
    })
    .join(' ')

  const connectingLinePoints = connectingLine
    .map(point => {
      const [x, y] = pixelToCanvas(point)
      return `${x},${y}`
    })
    .join(' ')

  const [textPointX, textPointY] = pixelToCanvas(textPoint)
  const isHoveredMeasurement = measurement === hoveredMeasurement

  return (
    <>
      <polyline
        data-cy-id={id}
        style={{
          ...polylineStyle[isHoveredMeasurement ? 'hoveredOutline' : 'outline'],
        }}
        data-select={isHoveredMeasurement || undefined}
        points={poygonPoints}
      />
      <polyline
        data-cy-id={id}
        style={{
          ...polylineStyle.default,
        }}
        data-select={isHoveredMeasurement || undefined}
        points={poygonPoints}
      />
      {length && (
        <text style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }} x={textPointX} y={textPointY}>
          {length}mm
        </text>
      )}
      <polyline style={polylineStyle.dashLine} points={connectingLinePoints} />
    </>
  )
}
