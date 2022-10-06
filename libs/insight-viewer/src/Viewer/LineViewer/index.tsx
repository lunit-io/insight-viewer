import React, { ReactElement } from 'react'

import { LineViewerProps } from './LineViewer.types'
import { getPolyViewerInfo } from '../../utils/common/getPolyViewerInfo'
import { textStyle, svgWrapperStyle } from '../Viewer.styles'
import { useOverlayContext } from '../../contexts'

export function LineViewer({
  annotation,
  showOutline,
  showAnnotationLabel,
  hoveredAnnotation,
}: LineViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const { isHoveredAnnotation, labelPosition, polygonLabel, polygonPoints, headPoints } = getPolyViewerInfo({
    annotation,
    showOutline,
    hoveredAnnotation,
    pixelToCanvas,
  })

  return (
    <>
      {showOutline && (
        <polyline
          style={{
            ...svgWrapperStyle[isHoveredAnnotation ? 'hoveredOutline' : 'outline'],
          }}
          data-select={isHoveredAnnotation || undefined}
          points={polygonPoints}
        />
      )}
      {annotation.type === 'line' && headPoints && (
        <>
          {showOutline && (
            <polyline
              style={{
                ...svgWrapperStyle[isHoveredAnnotation ? 'hoveredOutline' : 'outline'],
              }}
              points={headPoints}
            />
          )}
          <polyline style={{ ...svgWrapperStyle.default }} points={headPoints} />
        </>
      )}
      <polyline
        style={{
          ...svgWrapperStyle.default,
        }}
        data-select={isHoveredAnnotation || undefined}
        points={polygonPoints}
      />
      <polyline
        style={{
          ...svgWrapperStyle.extendsArea,
        }}
        data-select={isHoveredAnnotation || undefined}
        points={polygonPoints}
      />
      {showAnnotationLabel && labelPosition && (
        <text style={{ ...textStyle.default }} x={labelPosition[0]} y={labelPosition[1]}>
          {polygonLabel}
        </text>
      )}
    </>
  )
}
