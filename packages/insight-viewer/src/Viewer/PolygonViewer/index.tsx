import React, { ReactElement } from 'react'

import { PolygonViewerProps } from './PolygonViewer.types'
import { getPolyViewerInfo } from '../../utils/common/getPolyProps'
import { textStyle, polygonStyle } from '../AnnotationViewer/AnnotationViewer.styles'

export function PolygonViewer({
  annotation,
  showOutline,
  showAnnotationLabel,
  selectedAnnotation,
  annotationAttrs,
}: PolygonViewerProps): ReactElement {
  const { isSelectedAnnotation, polygonAttributes, labelPosition, polygonLabel, polygonPoints } = getPolyViewerInfo({
    annotation,
    showOutline,
    selectedAnnotation,
    annotationAttrs,
  })

  return (
    <>
      {showOutline && (
        <polygon
          style={{
            ...polygonStyle[isSelectedAnnotation ? 'select' : 'outline'],
            ...polygonAttributes?.style,
          }}
          data-select={isSelectedAnnotation || undefined}
          points={polygonPoints}
        />
      )}
      <polygon
        style={{
          ...polygonStyle[isSelectedAnnotation ? 'select' : 'default'],
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
