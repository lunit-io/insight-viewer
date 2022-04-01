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

  const { points, editPoints, setMeasurementEditMode } = useMeasurementPointsHandler({
    mode,
    device,
    isEditing,
    measurements,
    svgElement: svgRef,
    selectedMeasurement,
    onSelectMeasurement,
    addMeasurement: onAdd,
  })

  return (
    <>
      {points.length > 1 ? (
        <svg ref={svgRef} width={width} height={height} style={{ ...svgStyle.default, ...style }} className={className}>
          {drawingMode === 'ruler' && <RulerDrawer setMeasurementEditMode={setMeasurementEditMode} points={points} />}
          {drawingMode === 'circle' && <CircleDrawer setMeasurementEditMode={setMeasurementEditMode} points={points} />}
          {isEditing && selectedMeasurement && editPoints && (
            <>
              <EditPointer
                setMeasurementEditMode={setMeasurementEditMode}
                editMode="startPoint"
                cx={editPoints[0]}
                cy={editPoints[1]}
              />
              <EditPointer
                setMeasurementEditMode={setMeasurementEditMode}
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
