/* eslint-disable no-nested-ternary */
import React from 'react'
import { EditMode } from 'types'
import { EDIT_CIRCLE_RADIUS } from 'const'
import { circleStyle } from '../../Viewer/MeasurementDrawer/MeasurementDrawer.styles'

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
  return (
    <>
      <circle
        onMouseDown={() => setEditMode(editMode)}
        cx={cx}
        cy={cy}
        r={EDIT_CIRCLE_RADIUS}
        style={circleStyle[isSelectedMode ? 'selectedOutline' : 'outline']}
      />
      <circle
        onMouseDown={() => setEditMode(editMode)}
        cx={cx}
        cy={cy}
        r={EDIT_CIRCLE_RADIUS}
        style={circleStyle[isSelectedMode ? 'select' : isHighlightMode ? 'highlight' : 'default']}
      />
    </>
  )
}
