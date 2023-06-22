import React, { ReactElement } from 'react'
import useRulerAnnotation from '../../hooks/useRulerMeasurement'

import { textStyle, svgWrapperStyle } from '../../viewer.styles'
import type { RulerViewerProps } from './RulerViewer.types'

export function RulerViewer({ annotation, isHovered }: RulerViewerProps): ReactElement {
  const { rulerLine, ref, connectingLine, formattedValue, textBoxPoint, visibility } = useRulerAnnotation(annotation)

  return (
    <>
      <polyline
        className="annotation-ruler pointer"
        style={{
          ...svgWrapperStyle[isHovered ? 'hoveredOutline' : 'outline'],
        }}
        data-select={isHovered}
        points={rulerLine}
      />
      <polyline
        className="annotation-ruler pointer"
        style={{
          ...svgWrapperStyle.extendsArea,
        }}
        data-select={isHovered}
        points={rulerLine}
      />
      <polyline
        className="annotation-ruler pointer"
        style={{
          ...svgWrapperStyle.default,
        }}
        data-select={isHovered}
        points={rulerLine}
      />
      <polyline style={{ ...svgWrapperStyle.dashLine, visibility }} points={connectingLine} />
      <text
        ref={ref}
        style={{
          ...textStyle[isHovered ? 'hover' : 'default'],
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
