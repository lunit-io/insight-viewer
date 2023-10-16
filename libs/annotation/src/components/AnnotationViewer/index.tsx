import React from 'react'

import { useOverlayContext } from '@lunit/insight-viewer'
import useCreatingDrawableAnnotation from '../../hooks/useCreatingDrawableAnnotation'

import { AreaViewer } from '../AreaViewer'
import { LineViewer } from '../LineViewer'
import { TextViewer } from '../TextViewer'
import { PointViewer } from '../PointViewer'
import { RulerViewer } from '../RulerViewer'
import { PolygonViewer } from '../PolygonViewer'

import type { MouseEvent } from 'react'
import type { Annotation } from '../../types'

export interface AnnotationViewerProps {
  annotation: Annotation
  showOutline: boolean
  showAnnotationLabel: boolean
  hoveredAnnotation?: Annotation | null
  onHover?: (annotation: Annotation | null) => void
  onClick?: (annotation: Annotation) => void
}

const annotationStyle: React.CSSProperties = {
  pointerEvents: 'auto',
}

export function AnnotationViewer({
  annotation,
  showOutline,
  showAnnotationLabel,
  hoveredAnnotation,
  onHover,
  onClick,
}: AnnotationViewerProps) {
  const { pixelToCanvas } = useOverlayContext()

  const viewerProps = {
    showOutline,
    showLabel: showAnnotationLabel,
    isHovered: hoveredAnnotation?.id === annotation.id,
  }

  const handleAnnotationClick = (event: MouseEvent) => {
    if (!onClick) return

    event.preventDefault()
    event.stopPropagation()

    if (onHover) {
      onHover(null)
    }

    onClick(annotation)
  }

  const handleAnnotationMouseOver = () => {
    if (!onHover) return
    onHover(annotation)
  }

  const handleAnnotationMouseLeave = () => {
    if (!onHover) return
    onHover(null)
  }

  const { drawableAnnotation } = useCreatingDrawableAnnotation({
    annotation: annotation,
    pixelToCanvas,
  })

  if (!drawableAnnotation) return null

  const { type, dataAttrs } = drawableAnnotation

  return (
    <g
      data-cy-id={annotation.id}
      key={annotation.id}
      onClick={handleAnnotationClick}
      onMouseOver={handleAnnotationMouseOver}
      onMouseLeave={handleAnnotationMouseLeave}
      style={annotationStyle}
      {...dataAttrs}
    >
      {type === 'polygon' && <PolygonViewer annotation={drawableAnnotation} {...viewerProps} />}
      {(type === 'freeLine' || type === 'line' || type === 'arrowLine') && (
        <LineViewer annotation={drawableAnnotation} {...viewerProps} />
      )}
      {type === 'point' && <PointViewer annotation={drawableAnnotation} {...viewerProps} />}
      {type === 'text' && <TextViewer annotation={drawableAnnotation} {...viewerProps} />}
      {type === 'ruler' && <RulerViewer annotation={drawableAnnotation} {...viewerProps} />}
      {type === 'area' && <AreaViewer annotation={drawableAnnotation} {...viewerProps} />}
    </g>
  )
}
