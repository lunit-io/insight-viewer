import React, { ReactElement } from 'react'

import { LineViewerProps } from './LineViewer.types'
import { getPolyViewerInfo } from '../../utils/common/getPolyProps'
import { textStyle, polylineStyle } from '../AnnotationViewer/AnnotationViewer.styles'

export function LineViewer({
  annotation,
  showOutline,
  showAnnotationLabel,
  selectedAnnotation,
  annotationAttrs,
  pixelToCanvas,
}: LineViewerProps): ReactElement {
  const { isSelectedAnnotation, polygonAttributes, labelPosition, polygonLabel, polygonPoints, headPoints } =
    getPolyViewerInfo({
      annotation,
      showOutline,
      selectedAnnotation,
      pixelToCanvas,
      annotationAttrs,
    })

  return (
    <>
      {showOutline && (
        <polyline
          style={{
            ...polylineStyle[isSelectedAnnotation ? 'select' : 'outline'],
            ...polygonAttributes?.style,
          }}
          data-select={isSelectedAnnotation || undefined}
          points={polygonPoints}
        />
      )}
      {annotation.type === 'line' && headPoints && (
        <polyline
          style={{ ...polylineStyle[isSelectedAnnotation ? 'select' : 'default'], ...polygonAttributes?.style }}
          points={headPoints}
        />
      )}
      <polyline
        style={{
          ...polylineStyle[isSelectedAnnotation ? 'select' : 'default'],
          ...polygonAttributes?.style,
        }}
        data-select={isSelectedAnnotation || undefined}
        points={polygonPoints}
      />
      {showAnnotationLabel && labelPosition && (
        <text
          style={{ ...textStyle[isSelectedAnnotation ? 'select' : 'default'] }}
          x={labelPosition[0]}
          y={labelPosition[1]}
        >
          {polygonLabel}
        </text>
      )}
    </>
  )
}
