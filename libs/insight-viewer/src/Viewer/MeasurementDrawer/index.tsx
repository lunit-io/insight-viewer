import React, { useRef } from 'react'

import { RulerDrawer } from '../RulerDrawer'
import { CircleDrawer } from '../CircleDrawer'
import { EditPointer } from '../../components/EditPointer'
import { svgRootStyle } from '../Viewer.styles'
import { MeasurementDrawerProps } from './MeasurementDrawer.types'

export function MeasurementDrawer({
  style,
  width,
  height,
  isEditing = false,
  selectedMeasurement,
  className,
  measurement,
  setMeasurementEditMode,
  currentEditMode,
  editPoints,
}: MeasurementDrawerProps): JSX.Element | null {
  const svgRef = useRef<SVGSVGElement>(null)

  const isSelectedMeasurement = isEditing && selectedMeasurement != null
  const isDrawing = !selectedMeasurement

  if (!measurement || (measurement && measurement.measuredValue === 0)) return null

  return (
    <svg ref={svgRef} width={width} height={height} style={{ ...svgRootStyle.default, ...style }} className={className}>
      {measurement.type === 'ruler' && (
        <RulerDrawer
          isSelectedMode={isSelectedMeasurement}
          measurement={measurement}
          setMeasurementEditMode={setMeasurementEditMode}
        />
      )}
      {measurement.type === 'circle' && (
        <CircleDrawer
          isSelectedMode={isSelectedMeasurement}
          measurement={measurement}
          setMeasurementEditMode={setMeasurementEditMode}
        />
      )}
      {editPoints && (
        <>
          <EditPointer
            setEditMode={setMeasurementEditMode}
            editMode="startPoint"
            isSelectedMode={currentEditMode === 'startPoint'}
            isHighlightMode={isSelectedMeasurement}
            isDrawing={isDrawing}
            cx={editPoints[0]}
            cy={editPoints[1]}
          />
          <EditPointer
            setEditMode={setMeasurementEditMode}
            editMode="endPoint"
            isSelectedMode={currentEditMode === 'endPoint'}
            isHighlightMode={isSelectedMeasurement}
            isDrawing={isDrawing}
            cx={editPoints[2]}
            cy={editPoints[3]}
          />
        </>
      )}
    </svg>
  )
}
