import React, { ReactElement } from 'react'
import useRulerMeasurement from '../../hooks/useRulerMeasurement'

import { textStyle, svgWrapperStyle } from '../Viewer.styles'
import type { RulerViewerProps } from './RulerViewer.types'

export function RulerViewer({ measurement, hoveredMeasurement }: RulerViewerProps): ReactElement {
  const { rulerLine, ref, connectingLine, formattedValue, textBoxPoint, visibility } = useRulerMeasurement(measurement)
  const isHoveredMeasurement = measurement === hoveredMeasurement || undefined

  return (
    <>
      <polyline
        style={{
          ...svgWrapperStyle[isHoveredMeasurement ? 'hoveredOutline' : 'outline'],
        }}
        data-select={isHoveredMeasurement}
        points={rulerLine}
      />
      <polyline
        style={{
          ...svgWrapperStyle.extendsArea,
        }}
        data-select={isHoveredMeasurement}
        points={rulerLine}
      />
      <polyline
        style={{
          ...svgWrapperStyle.default,
        }}
        data-select={isHoveredMeasurement}
        points={rulerLine}
      />
      <polyline style={{ ...svgWrapperStyle.dashLine, visibility }} points={connectingLine} />
      <text
        ref={ref}
        style={{
          ...textStyle[isHoveredMeasurement ? 'hover' : 'default'],
          visibility,
        }}
        x={textBoxPoint[0]}
        y={textBoxPoint[1]}
      >
        {formattedValue}
      </text>
    </>
  )
}
