import React, { ReactElement } from 'react'

import { Annotation } from '../../types'
import { FreeLineViewerProps } from './LineViewer.types'
import { getPolyViewerInfo } from '../../utils/common/getPolyProps'
import { textStyle, polylineStyle } from '../AnnotationViewer/AnnotationViewer.styles'

export function LineViewer<T extends Annotation>({
  annotation,
  showOutline,
  showAnnotationLabel,
  selectedAnnotation,
  annotationAttrs,
  pixelToCanvas,
}: FreeLineViewerProps<T>): ReactElement {
  const { isSelectedAnnotation, polygonAttributes, labelPosition, polygonLabel, polygonPoints } = getPolyViewerInfo({
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
          data-cy-id={polygonLabel}
          style={{
            ...polylineStyle[isSelectedAnnotation ? 'select' : 'outline'],
            ...polygonAttributes?.style,
          }}
          data-select={isSelectedAnnotation || undefined}
          points={polygonPoints}
        />
      )}
      <polyline
        data-cy-id={polygonLabel}
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
