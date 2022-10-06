import React, { ReactElement } from 'react'

import { PolygonViewerProps } from './PolygonViewer.types'
import { getPolyViewerInfo } from '../../utils/common/getPolyViewerInfo'
import { textStyle, svgWrapperStyle } from '../Viewer.styles'
import { useOverlayContext } from '../../contexts'

export function PolygonViewer({
  annotation,
  showOutline,
  showAnnotationLabel,
  hoveredAnnotation,
}: PolygonViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const { isHoveredAnnotation, labelPosition, polygonLabel, polygonPoints } = getPolyViewerInfo({
    annotation,
    showOutline,
    hoveredAnnotation,
    pixelToCanvas,
  })

  return (
    <>
      {showOutline && (
        <polygon
          style={{
            ...svgWrapperStyle[isHoveredAnnotation ? 'hoveredOutline' : 'outline'],
          }}
          data-select={isHoveredAnnotation || undefined}
          points={polygonPoints}
        />
      )}
      <polygon
        style={{
          ...svgWrapperStyle.default,
        }}
        data-select={isHoveredAnnotation || undefined}
        points={polygonPoints}
      />
      <polygon
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
