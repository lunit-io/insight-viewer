import React, { useRef } from 'react'
import { useOverlayContext } from '../../contexts'
import { Annotation } from '../../types'
import { svgStyle } from './AnnotationViewer.styles'
import { AnnotationsDrawProps, AnnotationViewerProps } from './AnnotationViewer.types'
import { LineViewer } from '../LineViewer'
import { PolygonViewer } from '../PolygonViewer'

function AnnotationsDraw<T extends Annotation>({
  mode,
  annotations,
  showOutline,
  showAnnotationLabel,
  selectedAnnotation,
  annotationAttrs,
  pixelToCanvas,
  onFocus,
  onRemove,
}: AnnotationsDrawProps<T>) {
  return annotations.map(annotation => {
    const viewerProps = {
      annotation,
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

    return (
      <g
        key={annotation.id}
        onClick={handleAnnotationClick}
        onMouseOver={handleAnnotationFocus}
        onMouseLeave={handleAnnotationFocusOut}
      >
        {mode === 'polygon' && <PolygonViewer {...viewerProps} />}
        {(mode === 'freeLine' || mode === 'line' || mode === 'arrowLine') && <LineViewer {...viewerProps} />}
      </g>
    )
  })
}

export function AnnotationViewer<T extends Annotation>({
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
}: AnnotationViewerProps<T>): JSX.Element {
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
