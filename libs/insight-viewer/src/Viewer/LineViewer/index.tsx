import React, { ReactElement } from 'react'

import { LineViewerProps } from './LineViewer.types'
import { getPolyViewerInfo } from '../../utils/common/getPolyViewerInfo'
import { textStyle, polylineStyle } from '../AnnotationViewer/AnnotationViewer.styles'
import { useOverlayContext } from '../../contexts'

export function LineViewer({
  annotation,
  showOutline,
  showAnnotationLabel,
  hoveredAnnotation,
  annotationAttrs,
}: LineViewerProps): ReactElement {
  const { pixelToCanvas } = useOverlayContext()

  const { isHoveredAnnotation, polygonAttributes, labelPosition, polygonLabel, polygonPoints, headPoints } =
    getPolyViewerInfo({
      annotation,
      showOutline,
      hoveredAnnotation,
      annotationAttrs,
      pixelToCanvas,
    })

  return (
    <>
      {showOutline && (
        <polyline
          style={{
            ...polylineStyle[isHoveredAnnotation ? 'hoveredOutline' : 'outline'],
            ...polygonAttributes?.style,
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
                ...polylineStyle[isHoveredAnnotation ? 'hoveredOutline' : 'outline'],
                ...polygonAttributes?.style,
              }}
              points={headPoints}
            />
          )}
          <polyline style={{ ...polylineStyle.default, ...polygonAttributes?.style }} points={headPoints} />
        </>
      )}
      <polyline
        style={{
          ...polylineStyle.default,
          ...polygonAttributes?.style,
        }}
        data-select={isHoveredAnnotation || undefined}
        points={polygonPoints}
      />
      <polyline
        style={{
          ...polylineStyle.extendsArea,
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
