import React, { ReactElement } from 'react'

import { Contour } from '../../types'
import { CurvedLineViewerProps } from './CurvedLineViewer.types'
import { getPolyViewerInfo } from '../../utils/common/getPolyProps'
import {
  textStyle,
  polylineStyle,
} from '../AnnotationViewer/AnnotationViewer.styles'

export function CurvedLineViewer<T extends Contour>({
  contour,
  showOutline,
  showPolygonLabel,
  focusedContour,
  polygonAttrs,
  pixelToCanvas,
}: CurvedLineViewerProps<T>): ReactElement {
  const {
    isFocusedPolygon,
    polygonAttributes,
    labelPosition,
    polygonLabel,
    polygonPoints,
  } = getPolyViewerInfo({
    contour,
    showOutline,
    focusedContour,
    pixelToCanvas,
    polygonAttrs,
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
      {showPolygonLabel && labelPosition && (
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
