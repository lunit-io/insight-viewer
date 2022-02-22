import React from 'react'

import { AnnotationProps } from './Annotation.types'
import { Contour } from '../../types'
import { AnnotationViewer } from '../AnnotationViewer'
import { AnnotationDrawer } from '../AnnotationDrawer'

export function Annotation<T extends Contour>({
  width,
  height,
  contours,
  focusedContour,
  className,
  style,
  showOutline,
  showPolygonLabel,
  mode,
  device,
  isDrawing = false,
  polygonAttrs,
  onFocus,
  onAdd,
  onRemove,
}: AnnotationProps<T>): JSX.Element {
  if (isDrawing && (!onFocus || !onAdd || !onRemove)) {
    throw new Error(
      'Please also add onFocus, onAdd, onRemove if you enable drawing mode'
    )
  }

  return (
    <>
      <AnnotationViewer
        width={width}
        height={height}
        contours={contours}
        focusedContour={focusedContour}
        className={className}
        style={style}
        showOutline={showOutline}
        showPolygonLabel={showPolygonLabel}
        mode={mode}
        polygonAttrs={polygonAttrs}
      />
      {isDrawing && onAdd && onFocus && onRemove && (
        <AnnotationDrawer
          width={width}
          height={height}
          contours={contours}
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
