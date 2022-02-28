import React, { useRef } from 'react'
import { useOverlayContext } from '../../contexts'
import { Contour } from '../../types'
import { svgStyle } from './AnnotationViewer.styles'
import {
  AnnotationsDrawProps,
  AnnotationViewerProps,
} from './AnnotationViewer.types'
import { LineViewer } from '../LineViewer'
import { FreeLineViewer } from '../FreeLineViewer'
import { PolygonViewer } from '../PolygonViewer'

function AnnotationsDraw<T extends Contour>({
  mode,
  contours,
  showOutline,
  showPolygonLabel,
  focusedContour,
  polygonAttrs,
  pixelToCanvas,
}: AnnotationsDrawProps<T>) {
  return contours.map(contour => {
    const viewerProps = {
      contour,
      showOutline,
      focusedContour,
      showPolygonLabel,
      polygonAttrs,
      pixelToCanvas,
    }

    return (
      <React.Fragment key={contour.id}>
        {mode === 'polygon' && <PolygonViewer {...viewerProps} />}
        {mode === 'freeLine' && <FreeLineViewer {...viewerProps} />}
        {mode === 'line' && <LineViewer {...viewerProps} />}
      </React.Fragment>
    )
  })
}

export function AnnotationViewer<T extends Contour>({
  style,
  width,
  height,
  contours,
  className,
  focusedContour,
  mode = 'polygon',
  showOutline = false,
  showPolygonLabel = false,
  polygonAttrs,
}: AnnotationViewerProps<T>): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const { pixelToCanvas, enabledElement } = useOverlayContext()

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ ...svgStyle.default, ...style }}
      className={className}
    >
      {contours.length === 0 || !enabledElement
        ? null
        : AnnotationsDraw({
            mode,
            contours,
            focusedContour,
            showOutline,
            showPolygonLabel,
            pixelToCanvas,
            polygonAttrs,
          })}
    </svg>
  )
}
