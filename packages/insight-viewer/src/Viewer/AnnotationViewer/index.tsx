import React, { useRef } from 'react'
import { useOverlayContext } from '../../contexts'
import { svgStyle } from './AnnotationViewer.styles'
import { AnnotationsDrawProps, AnnotationViewerProps } from './AnnotationViewer.types'
import { LineViewer } from '../LineViewer'
import { PolygonViewer } from '../PolygonViewer'

function AnnotationsDraw({
  mode,
  annotations,
  showOutline,
  showAnnotationLabel,
  selectedAnnotation,
  annotationAttrs,
  pixelToCanvas,
  onFocus,
  onRemove,
}: AnnotationsDrawProps) {
  return annotations.map(annotation => {
    const viewerProps = {
      showOutline,
      selectedAnnotation,
      showAnnotationLabel,
      annotationAttrs,
      pixelToCanvas,
    }

    const handleAnnotationClick = () => {
      if (!onRemove) return
      onRemove(annotation)
    }

    const handleAnnotationFocus = () => {
      if (!onFocus) return
      onFocus(annotation)
    }

    const handleAnnotationFocusOut = () => {
      if (!onFocus) return
      onFocus(null)
    }

    if (annotation.type !== mode) return null

    return (
      <g
        key={annotation.id}
        onClick={handleAnnotationClick}
        onMouseOver={handleAnnotationFocus}
        onMouseLeave={handleAnnotationFocusOut}
      >
        {annotation.type === 'polygon' && <PolygonViewer annotation={annotation} {...viewerProps} />}
        {(annotation.type === 'freeLine' || annotation.type === 'line' || annotation.type === 'arrowLine') && (
          <LineViewer annotation={annotation} {...viewerProps} />
        )}
      </g>
    )
  })
}

export function AnnotationViewer({
  style,
  width,
  height,
  annotations,
  className,
  selectedAnnotation,
  mode = 'polygon',
  showOutline = false,
  showAnnotationLabel = false,
  annotationAttrs,
  onFocus,
  onRemove,
}: AnnotationViewerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const { pixelToCanvas, enabledElement } = useOverlayContext()

  return (
    <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
      {annotations.length === 0 || !enabledElement
        ? null
        : AnnotationsDraw({
            mode,
            annotations,
            selectedAnnotation,
            showOutline,
            showAnnotationLabel,
            pixelToCanvas,
            annotationAttrs,
            onFocus,
            onRemove,
          })}
    </svg>
  )
}
