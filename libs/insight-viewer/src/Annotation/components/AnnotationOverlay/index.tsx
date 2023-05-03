import React from 'react'

import { useOverlayContext } from '../../../contexts'

import { AnnotationDrawer } from '../AnnotationDrawer'

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
}: AnnotationOverlayProps): React.ReactNode => {
  const { enabledElement } = useOverlayContext()

  const handleAddAnnotation = (annotation: Annotation) => {
    let addedTargetAnnotation: Annotation | null = annotation

    addedTargetAnnotation = validateAnnotation(addedTargetAnnotation)

    if (addedTargetAnnotation && onAdd) {
      addedTargetAnnotation = onAdd(addedTargetAnnotation)
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
      return
    }

    onChange(annotations.filter((a) => a.id !== annotation.id))
  }

  if (!enabledElement) return null

  return (
    <AnnotationDrawer
      width={width}
      height={height}
      annotations={annotations}
      hoveredAnnotation={hoveredAnnotation}
      selectedAnnotation={selectedAnnotation}
      showOutline={showOutline}
      showAnnotationLabel={showAnnotationLabel}
      className={className}
      style={style}
      isDrawing={isDrawing}
      clickAction={clickAction}
      mode={mode}
      onAdd={handleAddAnnotation}
      onSelect={onSelect}
      onHover={isDrawing ? onHover : undefined}
      onClick={isDrawing ? (clickAction === 'select' ? onSelect : handleRemoveAnnotation) : undefined}
    />
  )
}
