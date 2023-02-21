import React from 'react'

import { AnnotationDrawer } from '../AnnotationDrawer'
import { AnnotationsViewer } from '../AnnotationsViewer'

import type { AnnotationOverlayProps } from './AnnotationOverlay.types'

export const AnnotationOverlay = ({
  width,
  height,
  className,
  style,
  isDrawing,
  isEditing,
  mode,
  annotations,
  showOutline,
  hoveredAnnotation,
  selectedAnnotation,
  showAnnotationLabel,
  onAdd,
  onFocus,
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
        onFocus={isDrawing ? onFocus : undefined}
        onClick={isDrawing ? (isEditing ? onSelect : onRemove) : undefined}
      />
      {onAdd && (
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
          isEditing={isEditing}
          mode={mode}
          onAdd={onAdd}
          onSelect={onSelect}
        />
      )}
    </>
  )
}
