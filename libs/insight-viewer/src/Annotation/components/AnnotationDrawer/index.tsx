import React, { useRef, useState } from 'react'

import { useOverlayContext } from '../../../contexts'

import { svgRootStyle } from '../../../Viewer/Viewer.styles'

import { AreaDrawer } from '../AreaDrawer'
import { TextDrawer, TypingDrawer } from '../TextDrawer'
import { RulerDrawer } from '../RulerDrawer'
import { PolylineDrawer } from '../PolylineDrawer'

import { EditPointer } from '../../../components/EditPointer'

import useEditMode from '../../hooks/useEditMode'
import useDrawingHandler from '../../hooks/useDrawingHandler'
import useCreatingAnnotation from '../../hooks/useCreatingAnnotation'
import useCreatingDrawableAnnotation from '../../hooks/useCreatingDrawableAnnotation'

import { getCursorStatus } from '../../utils/getCursorStatus'
import { getEditPointPosition } from '../../utils/getEditPointPosition'

import type { Annotation, Point, TextAnnotation } from '../../types'
import type { AnnotationDrawerProps } from './AnnotationDrawer.types'

export function AnnotationDrawer({
  style,
  width,
  height,
  isDrawing,
  clickAction,
  showAnnotationLabel = false,
  annotations,
  selectedAnnotation,
  hoveredAnnotation,
  className,
  mode = 'polygon',
  onAdd,
  onSelect,
}: AnnotationDrawerProps): JSX.Element {
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

  const { image, pixelToCanvas } = useOverlayContext()
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

  const { drawableAnnotation } = useCreatingDrawableAnnotation({
    annotation,
    pixelToCanvas,
  })

  const canvasEditingPoints =
    movedStartPoint && drawingStartPoint
      ? ([drawingStartPoint, movedStartPoint].map(pixelToCanvas) as [Point, Point])
      : null

  const annotationEditPoints = getEditPointPosition({
    annotation: drawableAnnotation,
    editingPoints: canvasEditingPoints,
    isDefaultEditPointsOfAnnotation:
      isSelectedAnnotation && (!editMode || editMode === 'move' || editMode === 'textMove'),
  })

  // TODO: 이벤트를 분리할 수 있는 방법 고민
  useDrawingHandler({
    svgElement: svgRef,
    hoveredDrawing: hoveredAnnotation,
    setInitialPoint: (point: Point) => {
      if (!isSelectedAnnotation && !isDrawing) return

      setInitialAnnotation(point)
      setInitialDrawingPoints(point)
    },
    addDrawingPoint: (point) => {
      if (!isSelectedAnnotation && !isDrawing) return
      if (isSelectedAnnotation && !editMode) return

      updateDrawingAnnotation(point)
      setDrawingMovedPoint(point)
    },
    cancelDrawing: () => {
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
    },
    addDrewElement: () => {
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
    },
  })

  return (
    <>
      {drawableAnnotation && (
        <svg
          ref={svgRef}
          width={width}
          height={height}
          style={{ ...svgRootStyle.default, ...style }}
          className={className}
        >
          {(drawableAnnotation.type === 'polygon' ||
            drawableAnnotation.type === 'freeLine' ||
            drawableAnnotation.type === 'line' ||
            drawableAnnotation.type === 'arrowLine') && (
            <PolylineDrawer
              annotation={drawableAnnotation}
              isSelectedMode={isSelectedAnnotation}
              showAnnotationLabel={showAnnotationLabel}
              isPolygonSelected={selectedAnnotation?.type === 'polygon'}
              selectedAnnotationLabel={selectedAnnotation ? selectedAnnotation.label ?? selectedAnnotation.id : null}
              setAnnotationEditMode={updateEditMode}
            />
          )}
          {drawableAnnotation.type === 'ruler' && drawableAnnotation.measuredValue !== 0 && (
            <RulerDrawer
              isSelectedMode={isSelectedAnnotation}
              annotation={drawableAnnotation}
              setAnnotationEditMode={updateEditMode}
            />
          )}
          {drawableAnnotation.type === 'area' && drawableAnnotation.measuredValue !== 0 && (
            <AreaDrawer
              isSelectedMode={isSelectedAnnotation}
              annotation={drawableAnnotation}
              setAnnotationEditMode={updateEditMode}
            />
          )}
          {drawableAnnotation.type === 'text' && (
            <TextDrawer annotation={drawableAnnotation} setAnnotationEditMode={updateEditMode} />
          )}
          {annotationEditPoints && (
            <>
              <EditPointer
                setEditMode={updateEditMode}
                editMode="startPoint"
                isSelectedMode={false}
                isHighlightMode={isSelectedAnnotation}
                editPoint={annotationEditPoints[0]}
                cursorStatus={getCursorStatus(editMode)}
              />
              <EditPointer
                setEditMode={updateEditMode}
                editMode="endPoint"
                isHighlightMode={isSelectedAnnotation}
                isSelectedMode={Boolean(
                  isSelectedAnnotation && editMode && editMode !== 'move' && editMode !== 'textMove'
                )}
                editPoint={annotationEditPoints[1]}
                cursorStatus={getCursorStatus(editMode)}
              />
            </>
          )}
        </svg>
      )}
      {tempAnnotation && (
        <svg width={width} height={height} style={{ ...svgRootStyle.default, ...style }}>
          <TypingDrawer points={tempAnnotation.points} onFinish={handleTypingFinish} />
        </svg>
      )}
    </>
  )
}
