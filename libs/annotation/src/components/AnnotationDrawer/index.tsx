import React from 'react'

import { svgRootStyle } from '../../viewer.styles'
import { useOverlayContext } from '@lunit/insight-viewer'

import { AreaDrawer } from '../AreaDrawer'
import { RulerDrawer } from '../RulerDrawer'
import { PolylineDrawer } from '../PolylineDrawer'
import { TextDrawer, TypingDrawer } from '../TextDrawer'
import { EditPointer } from '../EditPointer'

import useCreatingDrawableAnnotation from '../../hooks/useCreatingDrawableAnnotation'

import { getCursorStatus } from '../../utils/getCursorStatus'
import { getEditPointPosition } from '../../utils/getEditPointPosition'

import type { Point } from '../../types'
import type { Annotation, EditMode, TextAnnotation } from '../../types'
import { PointDrawer } from '../PointDrawer'

interface AnnotationDrawerProps {
  width?: string | number
  height?: string | number
  style?: React.CSSProperties
  annotation: Annotation | null
  selectedAnnotation?: Annotation | null
  movedStartPoint: Point | null
  drawingStartPoint: Point | null
  isSelectedAnnotation: boolean
  showAnnotationLabel: boolean
  editMode: EditMode | null

  /**
   * TextAnnotation 개편 시, 해당 props 및 로직은 삭제 필요
   */
  tempAnnotation?: TextAnnotation
  onFinishTempAnnotationTyping: (text: string) => void
  updateEditMode: (editMode: EditMode) => void
}

export function AnnotationDrawer({
  width,
  height,
  style,
  annotation,
  selectedAnnotation,
  movedStartPoint,
  drawingStartPoint,
  isSelectedAnnotation,
  showAnnotationLabel,
  editMode,
  tempAnnotation,
  updateEditMode,
  onFinishTempAnnotationTyping,
}: AnnotationDrawerProps) {
  const { pixelToCanvas } = useOverlayContext()
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

  if (!drawableAnnotation && tempAnnotation) {
    return (
      <svg width={width} height={height} style={{ ...svgRootStyle.default, ...style }}>
        <TypingDrawer points={tempAnnotation.points} onFinish={onFinishTempAnnotationTyping} />
      </svg>
    )
  }

  if (!drawableAnnotation) return null

  const { type } = drawableAnnotation

  return (
    <>
      {(type === 'polygon' || type === 'freeLine' || type === 'line' || type === 'arrowLine') && (
        <PolylineDrawer
          annotation={drawableAnnotation}
          isSelectedMode={isSelectedAnnotation}
          showAnnotationLabel={showAnnotationLabel}
          isPolygonSelected={selectedAnnotation?.type === 'polygon'}
          selectedAnnotationLabel={selectedAnnotation ? selectedAnnotation.label ?? selectedAnnotation.id : null}
          setAnnotationEditMode={updateEditMode}
        />
      )}
      {type === 'ruler' && drawableAnnotation.measuredValue !== 0 && (
        <RulerDrawer
          isSelectedMode={isSelectedAnnotation}
          annotation={drawableAnnotation}
          setAnnotationEditMode={updateEditMode}
        />
      )}
      {type === 'area' && drawableAnnotation.measuredValue !== 0 && (
        <AreaDrawer
          isSelectedMode={isSelectedAnnotation}
          annotation={drawableAnnotation}
          setAnnotationEditMode={updateEditMode}
        />
      )}
      {type === 'point' && (
        <PointDrawer
          isSelectedMode={isSelectedAnnotation}
          showAnnotationLabel={showAnnotationLabel}
          annotation={drawableAnnotation}
          selectedAnnotationLabel={selectedAnnotation ? selectedAnnotation.label ?? selectedAnnotation.id : null}
          setAnnotationEditMode={updateEditMode}
        />
      )}
      {type === 'text' && <TextDrawer annotation={drawableAnnotation} setAnnotationEditMode={updateEditMode} />}
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
            isSelectedMode={Boolean(isSelectedAnnotation && editMode && editMode !== 'move' && editMode !== 'textMove')}
            editPoint={annotationEditPoints[1]}
            cursorStatus={getCursorStatus(editMode)}
          />
        </>
      )}
    </>
  )
}
