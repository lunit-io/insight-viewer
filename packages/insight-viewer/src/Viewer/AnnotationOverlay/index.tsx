import React from 'react'

import { AnnotationOverlayProps } from './AnnotationOverlay.types'
import { Annotation } from '../../types'
import { AnnotationViewer } from '../AnnotationViewer'
import { AnnotationDrawer } from '../AnnotationDrawer'

export function AnnotationOverlay<T extends Annotation>({
  width,
  height,
  annotations,
  focusedAnnotation,
  className,
  style,
  showOutline,
  showAnnotationLabel,
  mode,
  device,
  isDrawing = false,
  annotationAttrs,
  onFocus,
  onAdd,
  onRemove,
}: AnnotationOverlayProps<T>): JSX.Element {
  if (isDrawing && (!onFocus || !onAdd || !onRemove)) {
    throw new Error('Please also add onFocus, onAdd, onRemove if you enable drawing mode')
  }

  return (
    <>
      <AnnotationViewer
        width={width}
        height={height}
        annotations={annotations}
        focusedAnnotation={focusedAnnotation}
        className={className}
        style={style}
        showOutline={showOutline}
        showAnnotationLabel={showAnnotationLabel}
        mode={mode}
        annotationAttrs={annotationAttrs}
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
          onFocus={onFocus}
          onRemove={onRemove}
        />
      )}
    </>
  )
}
