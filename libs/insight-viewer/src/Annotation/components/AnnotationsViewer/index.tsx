import React, { useRef } from 'react'

import { useOverlayContext } from '../../../contexts'
import { svgRootStyle } from '../../../Viewer/Viewer.styles'

import useCreatingDrawableAnnotation from '../../hooks/useCreatingDrawableAnnotation'

import { AreaViewer } from '../AreaViewer'
import { LineViewer } from '../LineViewer'
import { TextViewer } from '../TextViewer'
import { RulerViewer } from '../RulerViewer'
import { PolygonViewer } from '../PolygonViewer'

import type { AnnotationViewerProps, AnnotationsViewerProps } from './AnnotationViewer.types'

const annotationStyle: React.CSSProperties = {
  pointerEvents: 'auto',
}
function AnnotationViewer({
  annotation,
  showOutline,
  showElementLabel,
  hoveredAnnotation,
  onFocus,
  onClick,
}: AnnotationViewerProps) {
  const { pixelToCanvas } = useOverlayContext()

  const viewerProps = {
    showOutline,
    showLabel: showElementLabel,
    isHovered: hoveredAnnotation?.id === annotation.id,
  }

  const handleAnnotationClick = () => {
    if (!onClick) return

    if (onFocus) {
      onFocus(null)
    }

    onClick(annotation)
  }

  const handleAnnotationFocus = () => {
    if (!onFocus) return
    onFocus(annotation)
  }

  const handleAnnotationFocusOut = () => {
    if (!onFocus) return
    onFocus(null)
  }

  const { drawableAnnotation } = useCreatingDrawableAnnotation({
    annotation: annotation,
    pixelToCanvas,
  })

  return (
    <g
      data-cy-id={annotation.id}
      key={annotation.id}
      onClick={handleAnnotationClick}
      onMouseOver={handleAnnotationFocus}
      onMouseLeave={handleAnnotationFocusOut}
      style={annotationStyle}
    >
      {!drawableAnnotation ? null : (
        <>
          {drawableAnnotation.type === 'polygon' && <PolygonViewer annotation={drawableAnnotation} {...viewerProps} />}
          {(drawableAnnotation.type === 'freeLine' ||
            drawableAnnotation.type === 'line' ||
            drawableAnnotation.type === 'arrowLine') && <LineViewer annotation={drawableAnnotation} {...viewerProps} />}
          {drawableAnnotation.type === 'text' && <TextViewer annotation={drawableAnnotation} {...viewerProps} />}
          {drawableAnnotation.type === 'ruler' && <RulerViewer annotation={drawableAnnotation} {...viewerProps} />}
          {drawableAnnotation.type === 'area' && <AreaViewer annotation={drawableAnnotation} {...viewerProps} />}
        </>
      )}
    </g>
  )
}

export function AnnotationsViewer({
  style,
  width,
  height,
  annotations,
  className,
  hoveredAnnotation,
  selectedAnnotation,
  showOutline = true,
  showElementLabel = false,
  onFocus,
  onClick,
}: AnnotationsViewerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)

  const { enabledElement } = useOverlayContext()

  const annotationsWithoutSelected = annotations.filter((annotation) => annotation.id !== selectedAnnotation?.id)

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ ...svgRootStyle.default, pointerEvents: 'none', ...style }}
      className={className}
    >
      {enabledElement &&
        annotationsWithoutSelected.map((annotation) => (
          <AnnotationViewer
            key={annotation.id}
            showElementLabel={showElementLabel}
            annotation={annotation}
            showOutline={showOutline}
            hoveredAnnotation={hoveredAnnotation}
            onFocus={onFocus}
            onClick={onClick}
          />
        ))}
    </svg>
  )
}
