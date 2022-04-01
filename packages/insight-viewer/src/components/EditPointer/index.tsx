import React from 'react'
import { EditMode } from '../../types'
import { EDIT_CIRCLE_RADIUS } from '../../const'
import { circleStyle } from '../../Viewer/MeasurementDrawer/MeasurementDrawer.styles'

interface EditPointerProps {
  cx: number
  cy: number
  editMode: EditMode
  setMeasurementEditMode: (editMode: EditMode) => void
}

export function EditPointer({ cx, cy, editMode, setMeasurementEditMode }: EditPointerProps): JSX.Element {
  return (
    <circle
      onMouseDown={() => setMeasurementEditMode(editMode)}
      cx={cx}
      cy={cy}
      r={EDIT_CIRCLE_RADIUS}
      style={circleStyle.default}
    />
  )
}
