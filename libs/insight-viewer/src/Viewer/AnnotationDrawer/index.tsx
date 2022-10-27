import React, { useRef, useState } from 'react'

import { checkIsInitialAnnotation } from '../../utils/common/checkIsInitialAnnotation'

import { svgRootStyle } from '../Viewer.styles'
import { TextAnnotation } from '../../types'
import { AnnotationDrawerProps } from './AnnotationDrawer.types'
import useAnnotationPointsHandler from '../../hooks/useAnnotationPointsHandler'
import { PolylineDrawer } from '../PolylineDrawer'
import { TextDrawer, TypingDrawer } from '../TextDrawer'
import { EditPointer } from '../../components/EditPointer'

export function AnnotationDrawer({
  style,
  width,
  height,
  isEditing = false,
  showAnnotationLabel = false,
  annotations,
  selectedAnnotation,
  hoveredAnnotation,
  onSelectAnnotation,
  className,
  lineHead = 'normal',
  mode = 'polygon',
  onAdd,
}: AnnotationDrawerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const [tempAnnotation, setTempAnnotation] = useState<TextAnnotation>()
  const handleTypingFinish = (text: string) => {
    setTempAnnotation(undefined)
    if (tempAnnotation && text !== '') {
      onAdd({ ...tempAnnotation, label: text })
    }
  }

  const { annotation, editPoints, currentEditMode, setAnnotationEditMode, cursorStatus } = useAnnotationPointsHandler({
    isEditing,
    mode,
    lineHead,
    annotations,
    selectedAnnotation,
    onSelectAnnotation,
    hoveredAnnotation,
    svgElement: svgRef,
    addAnnotation:
      mode === 'text'
        ? (a) => {
            if (a.label) {
              onAdd(a)
            } else {
              // TODO: 추후 TextAnnotation 재설계 후 아래 주석과 코드 정리할 것.
              // a 의 좌표가 유효하지 않을경우 setTempAnnotation 이 아예 실행되지 않도록 로직 추가
              // Typing.tsx 에도 비슷한 코드가 존재하나 혹시 모를 사이드 이펙트를 고려하여 남겨둠
              const textAnnotation = a as TextAnnotation
              const [start, end] = textAnnotation.points

              if (typeof end === 'undefined' || end[0] < start[0] || end[1] < start[1]) {
                return
              }

              if (!tempAnnotation) {
                setTempAnnotation(textAnnotation)
              }
            }
          }
        : onAdd,
  })

  const isSelectedAnnotation = isEditing && selectedAnnotation != null
  const isDrawing = !selectedAnnotation

  return (
    <>
      {annotation && !checkIsInitialAnnotation(annotation) && (
        <svg
          ref={svgRef}
          width={width}
          height={height}
          style={{ ...svgRootStyle.default, ...style }}
          className={className}
        >
          {(annotation.type === 'polygon' || annotation.type === 'freeLine' || annotation.type === 'line') && (
            <PolylineDrawer
              annotation={annotation}
              isSelectedMode={isSelectedAnnotation}
              showAnnotationLabel={showAnnotationLabel}
              isPolygonSelected={selectedAnnotation?.type === 'polygon'}
              lineHead={lineHead}
              selectedAnnotationLabel={selectedAnnotation ? selectedAnnotation.label ?? selectedAnnotation.id : null}
              setAnnotationEditMode={setAnnotationEditMode}
              cursorStatus={cursorStatus}
            />
          )}
          {annotation.type === 'text' && (
            <TextDrawer
              annotation={annotation}
              isSelectedMode={isSelectedAnnotation}
              setAnnotationEditMode={setAnnotationEditMode}
              cursorStatus={cursorStatus}
            />
          )}
          {editPoints && (
            <>
              <EditPointer
                setEditMode={setAnnotationEditMode}
                editMode="startPoint"
                isSelectedMode={currentEditMode === 'startPoint'}
                isHighlightMode={isSelectedAnnotation}
                isDrawing={isDrawing}
                cx={editPoints[0]}
                cy={editPoints[1]}
                cursorStatus={cursorStatus}
              />
              <EditPointer
                setEditMode={setAnnotationEditMode}
                editMode="endPoint"
                isHighlightMode={isSelectedAnnotation}
                isSelectedMode={currentEditMode === 'endPoint'}
                isDrawing={isDrawing}
                cx={editPoints[2]}
                cy={editPoints[3]}
                cursorStatus={cursorStatus}
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
