/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useState } from 'react'

import { svgStyle } from './AnnotationDrawer.styles'
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
  annotations,
  selectedAnnotation,
  onSelectAnnotation,
  className,
  lineHead = 'normal',
  mode = 'polygon',
  onAdd,
}: AnnotationDrawerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)
  const [tempAnnotation, setTempAnnotation] = useState<TextAnnotation>()
  const { points, editPoints, setAnnotationEditMode } = useAnnotationPointsHandler({
    isEditing,
    mode,
    lineHead,
    annotations,
    selectedAnnotation,
    onSelectAnnotation,
    svgElement: svgRef,
    addAnnotation:
      mode === 'text'
        ? a => {
            if (a.label) {
              onAdd(a)
            } else {
              setTempAnnotation(a as TextAnnotation)
            }
          }
        : onAdd,
  })
  const handleTypingFinish = (text: string) => {
    setTempAnnotation(undefined)
    if (tempAnnotation && text !== '') {
      onAdd({ ...tempAnnotation, label: text })
    }
  }

  return (
    <>
      {points.length > 1 && (
        <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
          {(mode === 'polygon' || mode === 'freeLine' || mode === 'line') && (
            <PolylineDrawer
              points={points}
              mode={mode}
              lineHead={lineHead}
              setAnnotationEditMode={setAnnotationEditMode}
            />
          )}
          {mode === 'text' && (
            <TextDrawer
              points={points}
              setAnnotationEditMode={setAnnotationEditMode}
              label={selectedAnnotation?.type === 'text' ? selectedAnnotation.label : undefined}
            />
          )}
          {editPoints && (
            <>
              <EditPointer
                setEditMode={setAnnotationEditMode}
                editMode="startPoint"
                cx={editPoints[0]}
                cy={editPoints[1]}
              />
              <EditPointer
                setEditMode={setAnnotationEditMode}
                editMode="endPoint"
                cx={editPoints[2]}
                cy={editPoints[3]}
              />
            </>
          )}
        </svg>
      )}
      {tempAnnotation && (
        <svg width={width} height={height} style={{ ...svgStyle.default, ...style }}>
          <TypingDrawer points={tempAnnotation.points} onFinish={handleTypingFinish} />
        </svg>
      )}
    </>
  )
}
