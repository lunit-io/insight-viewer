import React from 'react'

import type { OverlayContextProps } from './types'

import { AnnotationDrawer } from './components/AnnotationDrawer'
import { AnnotationsViewer } from './components/AnnotationsViewer'

export const AnnotationOverlay = ({
  width,
  height,
  className,
  style,
  isDrawing,
  isEditing,
  mode,
  elements,
  showOutline,
  hoveredElement,
  selectedElement,
  showAnnotationLabel,
  onAdd,
  onFocus,
  onRemove,
  onSelect,
}: OverlayContextProps): JSX.Element => {
  return (
    <>
      <AnnotationsViewer
        width={width}
        height={height}
        elements={elements}
        hoveredElement={hoveredElement}
        selectedElement={selectedElement}
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
          annotations={elements}
          hoveredAnnotation={hoveredElement}
          selectedAnnotation={selectedElement}
          showAnnotationLabel={showAnnotationLabel}
          className={className}
          style={style}
          isDrawing={isDrawing}
          isEditing={isEditing}
          mode={mode}
          onAdd={onAdd}
          onSelectAnnotation={onSelect}
        />
      )}
    </>
  )
}
