import React, { ReactElement } from 'react'

import { textStyle, svgWrapperStyle } from '../../viewer.styles'

import type { PolylineDrawerProps } from './PolylineDrawer.types'

const PolylineElement = ({
  isPolygon,
  ...rest
}: React.SVGProps<SVGPolygonElement | SVGPolylineElement> & { isPolygon: boolean }) =>
  isPolygon ? <polygon {...rest} /> : <polyline {...rest} />

export function PolylineDrawer({
  annotation,
  isSelectedMode,
  selectedAnnotationLabel,
  showAnnotationLabel,
  isPolygonSelected,
  setAnnotationEditMode,
}: PolylineDrawerProps): ReactElement {
  const { drawingPointsToString, cursorClassName, canvasLabelPosition, type } = annotation

  return (
    <g data-cy-annotation onMouseDown={() => setAnnotationEditMode('move')}>
      <PolylineElement isPolygon={isPolygonSelected} style={svgWrapperStyle.outline} points={drawingPointsToString} />
      {type === 'arrowLine' && (
        <>
          <PolylineElement
            className={`annotation-polyline ${cursorClassName} `}
            isPolygon={isPolygonSelected}
            style={svgWrapperStyle.outline}
            points={annotation.canvasArrowHeadPoints}
          />
          <PolylineElement
            className={`annotation-polyline ${cursorClassName}`}
            isPolygon={isPolygonSelected}
            style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
            points={annotation.canvasArrowHeadPoints}
          />
        </>
      )}
      <PolylineElement
        className={`annotation-polyline ${cursorClassName}`}
        isPolygon={isPolygonSelected}
        style={svgWrapperStyle[isSelectedMode ? 'select' : 'default']}
        points={drawingPointsToString}
      />
      <PolylineElement
        className={`annotation-polyline ${cursorClassName}`}
        isPolygon={isPolygonSelected}
        style={svgWrapperStyle.extendsArea}
        points={drawingPointsToString}
      />
      {showAnnotationLabel && selectedAnnotationLabel && canvasLabelPosition && (
        <text
          className={`annotation-polyline label ${cursorClassName}`}
          style={{ ...textStyle.default }}
          x={canvasLabelPosition[0]}
          y={canvasLabelPosition[1]}
        >
          {selectedAnnotationLabel}
        </text>
      )}
    </g>
  )
}
