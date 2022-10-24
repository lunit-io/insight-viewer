import React, { useRef } from 'react'

import { MeasurementOverlayProps } from './MeasurementOverlay.types'
import { MeasurementViewer } from '../MeasurementViewer'
import { MeasurementDrawer } from '../MeasurementDrawer'
import useMeasurementPointsHandler from '../../hooks/useMeasurementPointsHandler'
import CursorArea from '../CursorArea'

export function MeasurementOverlay({
  width,
  height,
  measurements,
  hoveredMeasurement,
  selectedMeasurement,
  className,
  style,
  showOutline,
  mode = 'ruler',
  device,
  isDrawing = false,
  isEditing = false,
  measurementAttrs,
  onAdd,
  onFocus,
  onSelect,
  onRemove,
}: MeasurementOverlayProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null)

  const { editPoints, measurement, currentEditMode, setMeasurementEditMode, cursorStatus } =
    useMeasurementPointsHandler({
      mode,
      isEditing,
      measurements,
      hoveredMeasurement,
      svgElement: svgRef,
      selectedMeasurement,
      onSelectMeasurement: onSelect,
      addMeasurement: onAdd,
    })

  if (isDrawing && !onAdd) {
    throw new Error('Please also add onAdd if you enable drawing mode')
  }

  return (
    <>
      <MeasurementViewer
        width={width}
        height={height}
        measurements={measurements}
        hoveredMeasurement={hoveredMeasurement}
        className={className}
        style={style}
        showOutline={showOutline}
        isEditing={isEditing}
        measurementAttrs={measurementAttrs}
        onFocus={onFocus}
        onRemove={onRemove}
        onSelect={onSelect}
      />
      {isDrawing && onAdd && (
        <MeasurementDrawer
          width={width}
          height={height}
          selectedMeasurement={selectedMeasurement}
          className={className}
          style={style}
          isEditing={isEditing}
          onSelectMeasurement={onSelect}
          editPoints={editPoints}
          measurement={measurement}
          currentEditMode={currentEditMode}
          setMeasurementEditMode={setMeasurementEditMode}
        />
      )}
    </>
  )
}
