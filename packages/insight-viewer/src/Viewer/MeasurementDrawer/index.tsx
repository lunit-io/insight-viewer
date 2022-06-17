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
  const drawingMode = isEditing && selectedMeasurement ? selectedMeasurement.type : mode

  const { editPoints, measurement, setMeasurementEditMode } = useMeasurementPointsHandler({
    mode,
    device,
    isEditing,
    measurements,
    svgElement: svgRef,
    selectedMeasurement,
    onSelectMeasurement,
    addMeasurement: onAdd,
  })

  const isDrawingMeasurement =
    measurement && (measurement.type === 'ruler' ? measurement.length !== 0 : measurement.radius !== 0)

  return (
    <>
      {isDrawingMeasurement ? (
        <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
          {drawingMode === 'ruler' && measurement.type === 'ruler' && (
            <RulerDrawer measurement={measurement} setMeasurementEditMode={setMeasurementEditMode} />
          )}
          {drawingMode === 'circle' && measurement.type === 'circle' && (
            <CircleDrawer measurement={measurement} setMeasurementEditMode={setMeasurementEditMode} />
          )}
          {editPoints && (
            <>
              <EditPointer
                setEditMode={setMeasurementEditMode}
                editMode="startPoint"
                cx={editPoints[0]}
                cy={editPoints[1]}
              />
              <EditPointer
                setEditMode={setMeasurementEditMode}
                editMode="endPoint"
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
