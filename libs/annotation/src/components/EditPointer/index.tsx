import React from 'react'
import { EDIT_CIRCLE_RADIUS } from '../../const'
import { editPointerStyle } from '../../viewer.styles'
import type { CursorStatus, EditMode, Point } from '../../types'

interface EditPointerProps {
  editPoint: Point
  editMode: EditMode
  cursorStatus: CursorStatus
  isSelectedMode?: boolean
  isHighlightMode?: boolean
  setEditMode: (editMode: EditMode) => void
}

export function EditPointer({
  editPoint: [cx, cy],
  editMode,
  isSelectedMode,
  isHighlightMode,
  setEditMode,
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
