import React from 'react'

import { AnnotationDrawer } from '../AnnotationDrawer'
import { AnnotationsViewer } from '../AnnotationsViewer'

import { validateAnnotation } from './utils/validateAnnotation'

import type { Annotation } from '../../types'
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
  onHover,
  onRemove,
  onSelect,
  onChange,
}: AnnotationOverlayProps): JSX.Element => {
  const handleAddAnnotation = (annotation: Annotation) => {
    let addedTargetAnnotation: Annotation | null = annotation

    const validatedAnnotation = validateAnnotation(addedTargetAnnotation)

    if (validatedAnnotation && onAdd) {
      addedTargetAnnotation = onAdd(validatedAnnotation)
    }

    if (!onChange) return

    if (!addedTargetAnnotation) {
      onChange(annotations)
      return
    }

    if (selectedAnnotation) {
      onChange(annotations.map((prevAnnotation) => (prevAnnotation.id === annotation.id ? annotation : prevAnnotation)))
      return
    }

    onChange([...annotations, annotation])
  }

  const handleRemoveAnnotation = (annotation: Annotation) => {
    let removedTargetAnnotation: Annotation | null = annotation

    if (onRemove) {
      removedTargetAnnotation = onRemove(annotation)
    }

    if (!onChange) return

    if (!removedTargetAnnotation) {
      onChange(annotations)
    }

    onChange(annotations.filter((a) => a.id !== annotation.id))
  }

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
        onHover={isDrawing ? onHover : undefined}
        onClick={isDrawing ? (clickAction === 'select' ? onSelect : handleRemoveAnnotation) : undefined}
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
        onAdd={handleAddAnnotation}
        onSelect={onSelect}
      />
    </>
  )
}
