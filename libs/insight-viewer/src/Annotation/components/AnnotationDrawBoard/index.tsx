import React, { useRef, useState } from 'react'

import { useOverlayContext } from '../../../contexts'

import { svgRootStyle } from '../../viewer.styles'

import { AnnotationViewer } from '../AnnotationViewer'
import { AnnotationDrawer } from '../AnnotationDrawer'

import useEditMode from '../../hooks/useEditMode'
import useAnnotationEvent from '../../hooks/useAnnotationEvent/useAnnotationEvent'
import useCreatingAnnotation from '../../hooks/useCreatingAnnotation'

import type { Point } from '../../../types'
import type { Annotation, TextAnnotation } from '../../types'
import type { AnnotationDrawBoard } from './AnnotationDrawBoard.types'

export function AnnotationDrawBoard({
  style,
  width,
  height,
  isDrawing,
  clickAction,
  showOutline = true,
  showAnnotationLabel = false,
  annotations,
  selectedAnnotation,
  hoveredAnnotation,
  className,
  mode = 'polygon',
  onAdd,
  onHover,
  onClick,
  onSelect,
}: AnnotationDrawBoard): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const isSelectedAnnotation = Boolean(clickAction === 'select' && selectedAnnotation)

  const [tempAnnotation, setTempAnnotation] = useState<TextAnnotation>()
  const handleTypingFinish = (text: string) => {
    setTempAnnotation(undefined)
    if (tempAnnotation && text !== '') {
      if (!onAdd) return

      onAdd({ ...tempAnnotation, label: text })
    }
  }

  const { image } = useOverlayContext()
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

  const annotationsWithoutSelected = annotations.filter((annotation) => annotation.id !== selectedAnnotation?.id)

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

    if (!onAdd) return

    onAdd(annotation as Annotation)
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
          onHover={onHover}
          onClick={onClick}
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
