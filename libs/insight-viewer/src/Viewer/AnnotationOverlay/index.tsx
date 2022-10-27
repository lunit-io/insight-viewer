import React from 'react'

import { AnnotationOverlayProps } from './AnnotationOverlay.types'
import { AnnotationViewer } from '../AnnotationViewer'
import { AnnotationDrawer } from '../AnnotationDrawer'

export function AnnotationOverlay({
  width,
  height,
  annotations,
  hoveredAnnotation,
  selectedAnnotation,
  className,
  style,
  showOutline,
  showAnnotationLabel,
  mode,
  lineHead,
  isDrawing = false,
  isEditing,
  annotationAttrs,
  onFocus,
  onAdd,
  onSelect,
  onRemove,
}: AnnotationOverlayProps): JSX.Element {
  if (isDrawing && !onAdd) {
    throw new Error('Please also add onAdd if you enable drawing mode')
  }

  return (
    <>
      <AnnotationViewer
        width={width}
        height={height}
        annotations={annotations}
        hoveredAnnotation={hoveredAnnotation}
        selectedAnnotation={selectedAnnotation}
        className={className}
        style={style}
        showOutline={showOutline}
        showAnnotationLabel={showAnnotationLabel}
        annotationAttrs={annotationAttrs}
        onFocus={onFocus}
        onClick={isEditing ? onSelect : onRemove}
      />
      {isDrawing && onAdd && (
        <AnnotationDrawer
          width={width}
          height={height}
          annotations={annotations}
          selectedAnnotation={selectedAnnotation}
          showAnnotationLabel={showAnnotationLabel}
          hoveredAnnotation={hoveredAnnotation}
          className={className}
          style={style}
          isEditing={isEditing}
          mode={mode}
          lineHead={lineHead}
          onAdd={onAdd}
          onSelectAnnotation={onSelect}
        />
      )}
    </>
  )
}
