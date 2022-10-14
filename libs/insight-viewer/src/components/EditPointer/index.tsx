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
  isEditing?: boolean
  setEditMode: (editMode: EditMode) => void
}

export function EditPointer({
  cx,
  cy,
  editMode,
  isSelectedMode,
  isHighlightMode,
  setEditMode,
  isEditing,
}: EditPointerProps): JSX.Element {
  const handleOnMouseDown = () => setEditMode(editMode)

  const category = isEditing ? `editing-pointer` : `drawing-pointer`

  return (
    <>
      <circle
        className={category}
        onMouseDown={handleOnMouseDown}
        cx={cx}
        cy={cy}
        r={EDIT_CIRCLE_RADIUS}
        style={editPointerStyle[isSelectedMode ? 'selectedOutline' : 'outline']}
      />
      <circle
        className={`${category} move`}
        onMouseDown={handleOnMouseDown}
        cx={cx}
        cy={cy}
        r={EDIT_CIRCLE_RADIUS}
        style={editPointerStyle.extendsArea}
      />
      <circle
        className={`${category} move`}
        onMouseDown={handleOnMouseDown}
        cx={cx}
        cy={cy}
        r={EDIT_CIRCLE_RADIUS}
        style={editPointerStyle[isSelectedMode ? 'select' : isHighlightMode ? 'highlight' : 'default']}
      />
    </>
  )
}
