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
  device,
  isDrawing = false,
  head = 'normal',
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
        mode={mode}
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
          onAdd={onAdd}
          head={head}
        />
      )}
    </>
  )
}
