import React, { useRef } from 'react'
import { useOverlayContext } from '../../contexts'
import { svgStyle } from './AnnotationViewer.styles'
import { AnnotationsDrawProps, AnnotationViewerProps } from './AnnotationViewer.types'
import { LineViewer } from '../LineViewer'
import { PolygonViewer } from '../PolygonViewer'
import { TextViewer } from '../TextViewer'

function AnnotationsDraw({
  annotations,
  showOutline,
  showAnnotationLabel,
  hoveredAnnotation,
  annotationAttrs,
  onFocus,
  onClick,
}: AnnotationsDrawProps) {
  return annotations.map(annotation => {
    const viewerProps = {
      showOutline,
      hoveredAnnotation,
      showAnnotationLabel,
      annotationAttrs,
    }

    const handleAnnotationClick = () => {
      if (onClick) {
        onClick(annotation)
      }
    }

    const handleAnnotationFocus = () => {
      if (!onFocus) return
      onFocus(annotation)
    }

    const handleAnnotationFocusOut = () => {
      if (!onFocus) return
      onFocus(null)
    }

    return (
      <g
        data-cy-id={annotation.id}
        key={annotation.id}
        onClick={handleAnnotationClick}
        onMouseOver={handleAnnotationFocus}
        onMouseLeave={handleAnnotationFocusOut}
      >
        {annotation.type === 'polygon' && <PolygonViewer annotation={annotation} {...viewerProps} />}
        {(annotation.type === 'freeLine' || annotation.type === 'line') && (
          <LineViewer annotation={annotation} {...viewerProps} />
        )}
        {annotation.type === 'text' && <TextViewer annotation={annotation} {...viewerProps} />}
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
  hoveredAnnotation,
  showOutline = true,
  showAnnotationLabel = false,
  annotationAttrs,
  onFocus,
  onClick,
}: AnnotationViewerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const { enabledElement } = useOverlayContext()

  return (
    <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
      {annotations.length === 0 || !enabledElement
        ? null
        : AnnotationsDraw({
            annotations,
            hoveredAnnotation,
            showOutline,
            showAnnotationLabel,
            annotationAttrs,
            onFocus,
            onClick,
          })}
    </svg>
  )
}
