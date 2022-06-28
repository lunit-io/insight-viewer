/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from 'react'

import { RulerDrawer } from '../RulerDrawer'
import { CircleDrawer } from '../CircleDrawer'
import { EditPointer } from '../../components/EditPointer'
import { svgStyle } from './MeasurementDrawer.styles'
import { MeasurementDrawerProps } from './MeasurementDrawer.types'
import useMeasurementPointsHandler from '../../hooks/useMeasurementPointsHandler'

export function MeasurementDrawer({
  style,
  width,
  height,
  device,
  isEditing = false,
  measurements,
  selectedMeasurement,
  className,
  mode = 'ruler',
  onAdd,
  onSelectMeasurement,
}: MeasurementDrawerProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)

  const { editPoints, measurement, currentEditMode, setMeasurementEditMode } = useMeasurementPointsHandler({
    mode,
    device,
    isEditing,
    measurements,
    svgElement: svgRef,
    selectedMeasurement,
    onSelectMeasurement,
    addMeasurement: onAdd,
  })

  const isSelectedMeasurement = isEditing && selectedMeasurement != null

  return (
    <>
      {measurement && (measurement.type === 'ruler' ? measurement.length !== 0 : measurement.radius !== 0) ? (
        <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
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
                cx={editPoints[0]}
                cy={editPoints[1]}
              />
              <EditPointer
                setEditMode={setMeasurementEditMode}
                editMode="endPoint"
                isSelectedMode={currentEditMode === 'endPoint'}
                isHighlightMode={isSelectedMeasurement}
                cx={editPoints[2]}
                cy={editPoints[3]}
              />
            </>
          )}
        </svg>
      ) : null}
    </>
  )
}
