import React, { useRef, useState } from 'react'

import { useOverlayContext } from '@lunit/insight-viewer'

import { svgRootStyle } from '../../viewer.styles'

import { AnnotationViewer } from '../AnnotationViewer'
import { AnnotationDrawer } from '../AnnotationDrawer'

import useEditMode from '../../hooks/useEditMode'
import useMouseEvent from '../../hooks/useMouseEvent'
import useCreatingAnnotation from '../../hooks/useCreatingAnnotation'

import { addAnnotation as _addAnnotation } from './utils/addAnnotation'
import { removeAnnotation as _removeAnnotation } from './utils/removeAnnotation'
import {
  setInitialPointCallback,
  addDrawingPointCallback,
  addDrewAnnotationCallback,
  cancelDrawingCallback,
} from './utils/mouseEventCallback'

import type { TextAnnotation } from '../../types'
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

  const addAnnotation = _addAnnotation({ annotation, annotations, selectedAnnotation, onAdd, onChange })
  const removeAnnotation = _removeAnnotation({ annotations, onRemove, onChange })

  const setInitialPoints = setInitialPointCallback({
    hoveredAnnotation,
    tempAnnotation,
    isSelectedAnnotation,
    isDrawing,
    setInitialAnnotation,
    setInitialDrawingPoints,
  })

  const addDrawingPoint = addDrawingPointCallback({
    isDrawing,
    isSelectedAnnotation,
    editMode,
    updateDrawingAnnotation,
    setDrawingMovedPoint,
  })

  const addDrewAnnotation = () =>
    addDrewAnnotationCallback({
      annotation,
      tempAnnotation,
      setTempAnnotation,
      addAnnotation,
    })

  const cancelDrawing = () =>
    cancelDrawingCallback({
      isSelectedAnnotation,
      editMode,
      onSelect,
      clearAnnotation,
      clearDrawingAndMovedPoints,
      clearEditMode,
    })

  const handleTypingFinish = (text: string) => {
    setTempAnnotation(undefined)
    if (tempAnnotation && text !== '') {
      addAnnotation({ ...tempAnnotation, label: text })
    }
  }

  const mouseHandler = useMouseEvent({
    mouseDownCallback: setInitialPoints,
    mouseMoveCallback: addDrawingPoint,
    mouseUpCallback: () => {
      addDrewAnnotation()
      cancelDrawing()
    },
    mouseLeaveCallback: () => {
      addDrewAnnotation()
      cancelDrawing()
    },
    keyDownCallback: (event) => {
      if (event.code === 'Escape') {
        addDrewAnnotation()
        cancelDrawing()
      }
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
      {...mouseHandler}
    >
      {annotationsWithoutSelected.map((annotation) => (
        <AnnotationViewer
          key={annotation.id}
          showAnnotationLabel={showAnnotationLabel}
          annotation={annotation}
          showOutline={showOutline}
          hoveredAnnotation={hoveredAnnotation}
          onHover={isDrawing ? onHover : undefined}
          onClick={isDrawing ? (clickAction === 'select' ? onSelect : removeAnnotation) : undefined}
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
