import React from 'react'

import { AnnotationOverlayProps } from './AnnotationOverlay.types'
import { AnnotationViewer } from '../AnnotationViewer'
import { AnnotationDrawer } from '../AnnotationDrawer'

export function AnnotationOverlay({
  width,
  height,
  annotations,
  selectedAnnotation,
  className,
  style,
  showOutline,
  showAnnotationLabel,
  mode,
  lineHead,
  device,
  isDrawing = false,
  annotationAttrs,
  onFocus,
  onAdd,
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
        selectedAnnotation={selectedAnnotation}
        className={className}
        style={style}
        showOutline={showOutline}
        showAnnotationLabel={showAnnotationLabel}
        annotationAttrs={annotationAttrs}
        onFocus={onFocus}
        onRemove={onRemove}
      />
      {isDrawing && onAdd && onFocus && onRemove && (
        <AnnotationDrawer
          width={width}
          height={height}
          annotations={annotations}
          className={className}
          style={style}
          device={device}
          mode={mode}
          lineHead={lineHead}
          onAdd={onAdd}
        />
      )}
    </>
  )
}
