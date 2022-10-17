/* eslint-disable no-nested-ternary */
import React from 'react'
import { EditMode } from '../../types'
import { EDIT_CIRCLE_RADIUS } from '../../const'
import { editPointerStyle } from '../../Viewer/Viewer.styles'

interface EditPointerProps {
  cx: number
  cy: number
  editMode: EditMode
  isSelectedMode?: boolean
  isHighlightMode?: boolean
  setEditMode: (editMode: EditMode) => void
}

export function EditPointer({
  cx,
  cy,
  editMode,
  isSelectedMode,
  isHighlightMode,
  setEditMode,
}: EditPointerProps): JSX.Element {
  const handleOnMouseDown = () => setEditMode(editMode)

  return (
    <>
      <circle
        className="edit-pointer"
        onMouseDown={handleOnMouseDown}
        cx={cx}
        cy={cy}
        r={EDIT_CIRCLE_RADIUS}
        style={editPointerStyle[isSelectedMode ? 'selectedOutline' : 'outline']}
      />
      <circle
        className="edit-pointer move"
        onMouseDown={handleOnMouseDown}
        cx={cx}
        cy={cy}
        r={EDIT_CIRCLE_RADIUS}
        style={editPointerStyle.extendsArea}
      />
      <circle
        className="edit-pointer move"
        onMouseDown={handleOnMouseDown}
        cx={cx}
        cy={cy}
        r={EDIT_CIRCLE_RADIUS}
        style={editPointerStyle[isSelectedMode ? 'select' : isHighlightMode ? 'highlight' : 'default']}
      />
    </>
  )
}
