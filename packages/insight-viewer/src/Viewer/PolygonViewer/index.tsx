import React, { ReactElement } from 'react'

import { Annotation } from '../../types'
import { PolygonViewerProps } from './PolygonViewer.types'
import { getPolyViewerInfo } from '../../utils/common/getPolyProps'
import { textStyle, polygonStyle } from '../AnnotationViewer/AnnotationViewer.styles'

export function PolygonViewer<T extends Annotation>({
  annotation,
  showOutline,
  showAnnotationLabel,
  selectedAnnotation,
  annotationAttrs,
  pixelToCanvas,
}: PolygonViewerProps<T>): ReactElement {
  const { isSelectedPolygon, polygonAttributes, labelPosition, polygonLabel, polygonPoints } = getPolyViewerInfo({
    annotation,
    showOutline,
    selectedAnnotation,
    pixelToCanvas,
    annotationAttrs,
  })

  return (
    <>
      {showOutline && (
        <polygon
          data-cy-id={polygonLabel}
          style={{
            ...polygonStyle[isSelectedPolygon ? 'select' : 'outline'],
            ...polygonAttributes?.style,
          }}
          data-select={isSelectedPolygon || undefined}
          points={polygonPoints}
        />
      )}
      <polygon
        data-cy-id={polygonLabel}
        style={{
          ...polygonStyle[isSelectedPolygon ? 'select' : 'default'],
          ...polygonAttributes?.style,
        }}
        data-select={isSelectedPolygon || undefined}
        points={polygonPoints}
      />
      {showAnnotationLabel && labelPosition && (
        <text
          style={{ ...textStyle[isSelectedPolygon ? 'select' : 'default'] }}
          x={labelPosition[0]}
          y={labelPosition[1]}
        >
          {polygonLabel}
        </text>
      )}
    </>
  )
}
