import React, { ReactElement } from 'react'

import { Annotation } from '../../types'
import { FreeLineViewerProps } from './LineViewer.types'
import { getPolyViewerInfo } from '../../utils/common/getPolyProps'
import { textStyle, polylineStyle } from '../AnnotationViewer/AnnotationViewer.styles'

export function LineViewer<T extends Annotation>({
  annotation,
  showOutline,
  showAnnotationLabel,
  focusedAnnotation,
  annotationAttrs,
  pixelToCanvas,
}: FreeLineViewerProps<T>): ReactElement {
  const { isFocusedPolygon, polygonAttributes, labelPosition, polygonLabel, polygonPoints } = getPolyViewerInfo({
    annotation,
    showOutline,
    focusedAnnotation,
    pixelToCanvas,
    annotationAttrs,
  })

  return (
    <>
      {showOutline && (
        <polyline
          data-cy-id={polygonLabel}
          style={{
            ...polylineStyle[isFocusedPolygon ? 'focus' : 'outline'],
            ...polygonAttributes?.style,
          }}
          data-focus={isFocusedPolygon || undefined}
          points={polygonPoints}
        />
      )}
      <polyline
        data-cy-id={polygonLabel}
        style={{
          ...polylineStyle[isFocusedPolygon ? 'focus' : 'default'],
          ...polygonAttributes?.style,
        }}
        data-focus={isFocusedPolygon || undefined}
        points={polygonPoints}
      />
      {showAnnotationLabel && labelPosition && (
        <text
          style={{ ...textStyle[isFocusedPolygon ? 'focus' : 'default'] }}
          x={labelPosition[0]}
          y={labelPosition[1]}
        >
          {polygonLabel}
        </text>
      )}
    </>
  )
}
