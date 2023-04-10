import React from 'react'

import { AnnotationDrawer } from '../AnnotationDrawer'
import { AnnotationsViewer } from '../AnnotationsViewer'

import type { AnnotationOverlayProps } from './AnnotationOverlay.types'

export const AnnotationOverlay = ({
  width,
  height,
  className,
  style,
  isDrawing = false,
  clickAction = 'remove',
  mode,
  annotations,
  showOutline,
  hoveredAnnotation,
  selectedAnnotation,
  showAnnotationLabel,
  onAdd,
  onMouseOver,
  onRemove,
  onSelect,
}: AnnotationOverlayProps): JSX.Element => {
  return (
    <>
      <AnnotationsViewer
        width={width}
        height={height}
        annotations={annotations}
        hoveredAnnotation={hoveredAnnotation}
        selectedAnnotation={selectedAnnotation}
        className={className}
        style={style}
        showOutline={showOutline}
        showElementLabel={showAnnotationLabel}
        onMouseOver={isDrawing ? onMouseOver : undefined}
        onClick={isDrawing ? (clickAction === 'select' ? onSelect : onRemove) : undefined}
      />
      <AnnotationDrawer
        width={width}
        height={height}
        annotations={annotations}
        hoveredAnnotation={hoveredAnnotation}
        selectedAnnotation={selectedAnnotation}
        showAnnotationLabel={showAnnotationLabel}
        className={className}
        style={style}
        isDrawing={isDrawing}
        clickAction={clickAction}
        mode={mode}
        onAdd={onAdd}
        onSelect={onSelect}
      />
    </>
  )
}
