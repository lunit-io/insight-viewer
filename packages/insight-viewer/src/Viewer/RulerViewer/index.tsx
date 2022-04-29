/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useMemo } from 'react'

import { RulerViewerProps } from './RulerViewer.types'
import { textStyle, polylineStyle } from '../MeasurementViewer/MeasurementViewer.styles'
import { getLineLength } from '../../utils/common/getLineLength'
import { RULER_TEXT_POSITION_SPACING } from '../../const'
import { useOverlayContext } from '../../contexts'

export function RulerViewer({ measurement, hoveredMeasurement }: RulerViewerProps): ReactElement {
  const { image, pixelToCanvas } = useOverlayContext()
  const { id, points } = measurement
  const canvasPoints = useMemo(() => points.map(pixelToCanvas), [pixelToCanvas, points])

  const poygonPoints: string = useMemo(
    () =>
      canvasPoints
        .map(point => {
          const [x, y] = point
          return `${x},${y}`
        })
        .join(' '),
    [canvasPoints]
  )

  const [endPointX, endPointY] = pixelToCanvas(points[1])
  const lineLength = useMemo(
    () => (image ? `${getLineLength(canvasPoints[0], canvasPoints[1], image)?.toFixed(2)}mm` : null),
    []
  )

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
      {lineLength && (
        <text
          style={{ ...textStyle[isHoveredMeasurement ? 'hover' : 'default'] }}
          x={endPointX + RULER_TEXT_POSITION_SPACING.x}
          y={endPointY + RULER_TEXT_POSITION_SPACING.y}
        >
          {lineLength}
        </text>
      )}
    </>
  )
}
