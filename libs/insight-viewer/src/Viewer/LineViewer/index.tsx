import React, { ReactElement } from 'react'

import { LineViewerProps } from './LineViewer.types'
import { getPolyViewerInfo } from '../../utils/common/getPolyViewerInfo'
import { textStyle, svgWrapperStyle } from '../Viewer.styles'
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
          className="annotation-line pointer"
          style={{
            ...svgWrapperStyle[isHoveredAnnotation ? 'hoveredOutline' : 'outline'],
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
              className="annotation-line arrow pointer"
              style={{
                ...svgWrapperStyle[isHoveredAnnotation ? 'hoveredOutline' : 'outline'],
                ...polygonAttributes?.style,
              }}
              points={headPoints}
            />
          )}
          <polyline
            className="annotation-line arrow pointer"
            style={{ ...svgWrapperStyle.default, ...polygonAttributes?.style }}
            points={headPoints}
          />
        </>
      )}
      <polyline
        className="annotation-line pointer"
        style={{
          ...svgWrapperStyle.default,
          ...polygonAttributes?.style,
        }}
        data-select={isHoveredAnnotation || undefined}
        points={polygonPoints}
      />
      <polyline
        className="annotation-line pointer"
        style={{
          ...svgWrapperStyle.extendsArea,
          ...polygonAttributes?.style,
        }}
        data-select={isHoveredAnnotation || undefined}
        points={polygonPoints}
      />
      {showAnnotationLabel && labelPosition && (
        <text
          className="annotation-line label pointer"
          style={{ ...textStyle.default }}
          x={labelPosition[0]}
          y={labelPosition[1]}
        >
          {polygonLabel}
        </text>
      )}
    </>
  )
}
