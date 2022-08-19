import React, { ReactElement } from 'react'

import { Point } from '../../types'

import { RulerViewerProps } from './RulerViewer.types'
import { textStyle, polylineStyle } from '../MeasurementViewer/MeasurementViewer.styles'

import { getRulerTextPosition } from '../../utils/common/getRulerTextPosition'
import { getRulerConnectingLine } from '../../utils/common/getRulerConnectingLine'
import { useOverlayContext } from '../../contexts'

export function RulerViewer({ measurement, hoveredMeasurement }: RulerViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()
  const { points, length, unit } = measurement

  const canvasPoints = points.map(pixelToCanvas) as [Point, Point]

  const textPoint = pixelToCanvas(measurement.textPoint ?? getRulerTextPosition(points[1]))
  const isHoveredMeasurement = measurement === hoveredMeasurement

  const polygonPoints: string = canvasPoints
    .map((point) => {
      const [x, y] = point
      return `${x},${y}`
    })
    .join(' ')

  const connectingLine = getRulerConnectingLine(canvasPoints, textPoint)
    .map((point) => {
      const [x, y] = point

      return `${x},${y}`
    })
    .join(' ')

  return (
    <>
      <polyline
        style={{
          ...polylineStyle[isHoveredMeasurement ? 'hoveredOutline' : 'outline'],
        }}
        data-select={isHoveredMeasurement || undefined}
        points={polygonPoints}
      />
      <polyline
        style={{
          ...polylineStyle.default,
        }}
        data-select={isHoveredMeasurement || undefined}
        points={polygonPoints}
      />
      {length && (
        <text style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }} x={textPoint[0]} y={textPoint[1]}>
          {length.toFixed(1)}
          {unit}
        </text>
      )}
      <polyline style={polylineStyle.dashLine} points={connectingLine} />
    </>
  )
}
