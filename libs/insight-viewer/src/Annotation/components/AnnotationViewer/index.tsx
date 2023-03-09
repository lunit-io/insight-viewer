import React from 'react'

import { useOverlayContext } from '../../../contexts'
import useCreatingDrawableAnnotation from '../../hooks/useCreatingDrawableAnnotation'

import { AreaViewer } from '../AreaViewer'
import { LineViewer } from '../LineViewer'
import { TextViewer } from '../TextViewer'
import { RulerViewer } from '../RulerViewer'
import { PolygonViewer } from '../PolygonViewer'

import type { Annotation } from '../../types'
import type { AnnotationsViewerProps } from '../AnnotationsViewer/AnnotationViewer.types'

export interface AnnotationViewerProps
  extends Omit<AnnotationsViewerProps, 'width' | 'height' | 'selectedAnnotation' | 'annotations'> {
  annotation: Annotation
  showOutline: boolean
  showElementLabel: boolean
}

const annotationStyle: React.CSSProperties = {
  pointerEvents: 'auto',
}

export function AnnotationViewer({
  annotation,
  showOutline,
  showElementLabel,
  hoveredAnnotation,
  onMouseOver,
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

    if (onMouseOver) {
      onMouseOver(null)
    }

    onClick(annotation)
  }

  const handleAnnotationMouseOver = () => {
    if (!onMouseOver) return
    onMouseOver(annotation)
  }

  const handleAnnotationMouseLeave = () => {
    if (!onMouseOver) return
    onMouseOver(null)
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
      onMouseOver={handleAnnotationMouseOver}
      onMouseLeave={handleAnnotationMouseLeave}
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
