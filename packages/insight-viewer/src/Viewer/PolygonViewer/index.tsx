import React, { ReactElement } from 'react'

import { useOverlayContext } from 'contexts'
import { getPolyViewerInfo } from 'utils/common/getPolyProps'
import { textStyle, polygonStyle } from '../AnnotationViewer/AnnotationViewer.styles'
import { PolygonViewerProps } from './PolygonViewer.types'

export function PolygonViewer({
  annotation,
  showOutline,
  showAnnotationLabel,
  hoveredAnnotation,
  annotationAttrs,
}: PolygonViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const { isHoveredAnnotation, polygonAttributes, labelPosition, polygonLabel, polygonPoints } = getPolyViewerInfo({
    annotation,
    showOutline,
    hoveredAnnotation,
    annotationAttrs,
    pixelToCanvas,
  })

  return (
    <>
      {showOutline && (
        <polygon
          style={{
            ...polygonStyle[isHoveredAnnotation ? 'hoveredOutline' : 'outline'],
            ...polygonAttributes?.style,
          }}
          data-select={isHoveredAnnotation || undefined}
          points={polygonPoints}
        />
      )}
      <polygon
        style={{
          ...polygonStyle.default,
          ...polygonAttributes?.style,
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
