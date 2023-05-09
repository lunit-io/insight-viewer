import React, { useRef } from 'react'

import { useOverlayContext } from '../../../contexts'
import { svgRootStyle } from '../../viewer.styles'

import { AnnotationViewer } from '../AnnotationViewer'

import type { AnnotationsViewerProps } from './AnnotationViewer.types'

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
  onHover,
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
            onHover={onHover}
            onClick={onClick}
          />
        ))}
    </svg>
  )
}