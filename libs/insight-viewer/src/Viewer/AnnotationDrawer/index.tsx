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

  const { annotation, editPoints, currentEditMode, setAnnotationEditMode } = useAnnotationPointsHandler({
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
              setTempAnnotation(a as TextAnnotation)
            }
          }
        : onAdd,
  })

  const isSelectedAnnotation = isEditing && selectedAnnotation != null

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
            />
          )}
          {annotation.type === 'text' && (
            <TextDrawer
              annotation={annotation}
              isSelectedMode={isSelectedAnnotation}
              setAnnotationEditMode={setAnnotationEditMode}
            />
          )}
          {editPoints && (
            <>
              <EditPointer
                setEditMode={setAnnotationEditMode}
                editMode="startPoint"
                isSelectedMode={currentEditMode === 'startPoint'}
                isHighlightMode={isSelectedAnnotation}
                isEditing={isEditing}
                cx={editPoints[0]}
                cy={editPoints[1]}
              />
              <EditPointer
                setEditMode={setAnnotationEditMode}
                editMode="endPoint"
                isHighlightMode={isSelectedAnnotation}
                isSelectedMode={currentEditMode === 'endPoint'}
                isEditing={isEditing}
                cx={editPoints[2]}
                cy={editPoints[3]}
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
