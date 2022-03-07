import React, { ReactElement } from 'react'

import { Annotation } from '../../types'
import { PolygonViewerProps } from './PolygonViewer.types'
import { getPolyViewerInfo } from '../../utils/common/getPolyProps'
import { textStyle, polygonStyle } from '../AnnotationViewer/AnnotationViewer.styles'

export function PolygonViewer<T extends Annotation>({
  annotation,
  showOutline,
  showAnnotationLabel,
  focusedAnnotation,
  annotationAttrs,
  pixelToCanvas,
}: PolygonViewerProps<T>): ReactElement {
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
        <polygon
          data-cy-id={polygonLabel}
          style={{
            ...polygonStyle[isFocusedPolygon ? 'focus' : 'outline'],
            ...polygonAttributes?.style,
          }}
          data-focus={isFocusedPolygon || undefined}
          points={polygonPoints}
        />
      )}
      <polygon
        data-cy-id={polygonLabel}
        style={{
          ...polygonStyle[isFocusedPolygon ? 'focus' : 'default'],
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
