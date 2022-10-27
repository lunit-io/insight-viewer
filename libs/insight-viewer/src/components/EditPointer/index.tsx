/* eslint-disable no-nested-ternary */
import React from 'react'
import { EDIT_CIRCLE_RADIUS } from '../../const'
import { editPointerStyle } from '../../Viewer/Viewer.styles'
import type { CursorStatus, EditMode } from '../../types'

interface EditPointerProps {
  cx: number
  cy: number
  editMode: EditMode
  cursorStatus: CursorStatus
  isSelectedMode?: boolean
  isHighlightMode?: boolean
  isDrawing?: boolean
  setEditMode: (editMode: EditMode) => void
}

export function EditPointer({
  cx,
  cy,
  editMode,
  isSelectedMode,
  isHighlightMode,
  setEditMode,
  isDrawing,
  cursorStatus,
}: EditPointerProps): JSX.Element {
  const handleOnMouseDown = () => setEditMode(editMode)

  const cursorClassName = cursorStatus === null ? 'editable' : ''

  return (
    <>
      <circle
        onMouseDown={handleOnMouseDown}
        className={`editing-pointer ${cursorClassName}`}
        cx={cx}
        cy={cy}
        r={EDIT_CIRCLE_RADIUS}
        style={editPointerStyle[isSelectedMode ? 'selectedOutline' : 'outline']}
      />
      <circle
        onMouseDown={handleOnMouseDown}
        className={`editing-pointer ${cursorClassName}`}
        cx={cx}
        cy={cy}
        r={EDIT_CIRCLE_RADIUS}
        style={editPointerStyle[isSelectedMode ? 'select' : isHighlightMode ? 'highlight' : 'default']}
      />
      <circle
        className={`editing-pointer ${cursorClassName}`}
        onMouseDown={handleOnMouseDown}
        cx={cx}
        cy={cy}
        r={EDIT_CIRCLE_RADIUS}
        style={editPointerStyle.extendsArea}
      />
    </>
  )
}
