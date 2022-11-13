import React from 'react'

import { MeasurementViewer } from '../MeasurementViewer'
import { MeasurementDrawer } from '../MeasurementDrawer'

import type { MeasurementOverlayProps } from './MeasurementOverlay.types'

export function MeasurementOverlay({
  width,
  height,
  measurements,
  hoveredMeasurement,
  selectedMeasurement,
  className,
  style,
  showOutline,
  mode,
  isDrawing = false,
  isEditing,
  measurementAttrs,
  onAdd,
  onFocus,
  onSelect,
  onRemove,
}: MeasurementOverlayProps): JSX.Element {
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
        selectedMeasurement={selectedMeasurement}
        className={className}
        style={style}
        showOutline={showOutline}
        isEditing={isEditing}
        measurementAttrs={measurementAttrs}
        onFocus={onFocus}
        onClick={isEditing ? onSelect : onRemove}
      />
      {onAdd && (
        <MeasurementDrawer
          width={width}
          height={height}
          selectedMeasurement={selectedMeasurement}
          hoveredMeasurement={hoveredMeasurement}
          measurements={measurements}
          className={className}
          style={style}
          isDrawing={isDrawing}
          isEditing={isEditing}
          mode={mode}
          onAdd={onAdd}
          onSelectMeasurement={onSelect}
        />
      )}
    </>
  )
}
