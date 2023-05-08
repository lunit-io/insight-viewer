import React, { useRef, useState } from 'react'

import { useOverlayContext } from '../../../contexts'

import { svgRootStyle } from '../../viewer.styles'

import { AnnotationViewer } from '../AnnotationViewer'
import { AnnotationDrawer } from '../AnnotationDrawer'

import useEditMode from '../../hooks/useEditMode'
import useAnnotationEvent from '../../hooks/useAnnotationEvent'
import useCreatingAnnotation from '../../hooks/useCreatingAnnotation'

import { validateAnnotation } from './utils/validateAnnotation'

import type { Point } from '../../../types'
import type { Annotation, TextAnnotation } from '../../types'
import type { AnnotationOverlayProps } from './AnnotationOverlay.types'

export const AnnotationOverlay = ({
  width,
  height,
  className,
  style,
  isDrawing = false,
  clickAction = 'remove',
  mode = 'polygon',
  annotations,
  showOutline = true,
  hoveredAnnotation,
  selectedAnnotation,
  showAnnotationLabel = false,
  onAdd,
  onHover,
  onRemove,
  onSelect,
  onChange,
}: AnnotationOverlayProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [tempAnnotation, setTempAnnotation] = useState<TextAnnotation>()

  const isSelectedAnnotation = Boolean(clickAction === 'select' && selectedAnnotation)
  const annotationsWithoutSelected = annotations.filter((annotation) => annotation.id !== selectedAnnotation?.id)

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

  const { image, enabledElement } = useOverlayContext()
  const { editMode, updateEditMode, clearEditMode } = useEditMode()

  const {
    annotation,
    movedStartPoint,
    drawingStartPoint,
    clearAnnotation,
    setDrawingMovedPoint,
    setInitialAnnotation,
    setInitialDrawingPoints,
    updateDrawingAnnotation,
    clearDrawingAndMovedPoints,
  } = useCreatingAnnotation({
    mode,
    image,
    editMode,
    selectedAnnotation,
    id: annotations.length === 0 ? 1 : Math.max(...annotations.map(({ id }) => id), 0) + 1,
  })

  const setInitialPoint = (point: Point) => {
    if (hoveredAnnotation || tempAnnotation || (!isSelectedAnnotation && !isDrawing)) return

    setInitialAnnotation(point)
    setInitialDrawingPoints(point)
  }

  const addDrawingPoint = (point: Point) => {
    if (!isSelectedAnnotation && !isDrawing) return
    if (isSelectedAnnotation && !editMode) return

    updateDrawingAnnotation(point)
    setDrawingMovedPoint(point)
  }

  const cancelDrawing = () => {
    if (isSelectedAnnotation && editMode) {
      clearEditMode()
      clearDrawingAndMovedPoints()
      return
    }

    if (onSelect) {
      onSelect(null)
    }

    clearAnnotation()
    clearEditMode()
    clearDrawingAndMovedPoints()
  }

  const handleTypingFinish = (text: string) => {
    setTempAnnotation(undefined)
    if (tempAnnotation && text !== '') {
      handleAddAnnotation({ ...tempAnnotation, label: text })
    }
  }

  const addDrewElement = () => {
    if (annotation == null) return

    if (annotation.type === 'text' && !annotation.label) {
      // TODO: 추후 TextAnnotation 재설계 후 아래 주석과 코드 정리할 것.
      // a 의 좌표가 유효하지 않을경우 setTempAnnotation 이 아예 실행되지 않도록 로직 추가
      // Typing.tsx 에도 비슷한 코드가 존재하나 혹시 모를 사이드 이펙트를 고려하여 남겨둠
      const [start, end] = annotation.points

      if (typeof end === 'undefined' || end[0] < start[0] || end[1] < start[1]) {
        return
      }

      if (!tempAnnotation) {
        setTempAnnotation(annotation)
      }

      return
    }

    handleAddAnnotation(annotation as Annotation)
  }

  const { handleMouseDown, handleMouseLeave, handleMouseMove, handleMouseUp } = useAnnotationEvent({
    mouseDownCallback: setInitialPoint,
    mouseMoveCallback: addDrawingPoint,
    mouseUpCallback: () => {
      addDrewElement()
      cancelDrawing()
    },
    mouseLeaveCallback: () => {
      addDrewElement()
      cancelDrawing()
    },
    keyDownCallback: (event) => {
      if (event.code !== 'Escape') return

      addDrewElement()
      cancelDrawing()
    },
  })

  if (!enabledElement) return null

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ ...svgRootStyle.default, ...style }}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {annotationsWithoutSelected.map((annotation) => (
        <AnnotationViewer
          key={annotation.id}
          showAnnotationLabel={showAnnotationLabel}
          annotation={annotation}
          showOutline={showOutline}
          hoveredAnnotation={hoveredAnnotation}
          onHover={isDrawing ? onHover : undefined}
          onClick={isDrawing ? (clickAction === 'select' ? onSelect : handleRemoveAnnotation) : undefined}
        />
      ))}
      <AnnotationDrawer
        width={width}
        height={height}
        style={style}
        annotation={annotation}
        selectedAnnotation={selectedAnnotation}
        movedStartPoint={movedStartPoint}
        drawingStartPoint={drawingStartPoint}
        isSelectedAnnotation={isSelectedAnnotation}
        showAnnotationLabel={showAnnotationLabel}
        editMode={editMode}
        tempAnnotation={tempAnnotation}
        updateEditMode={updateEditMode}
        onFinishTempAnnotationTyping={handleTypingFinish}
      />
    </svg>
  )
}
